import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

import { createSupabaseAdminClientOrNull } from "@/lib/supabase";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type StoredUser = AuthUser & {
  passwordHash: string;
  salt: string;
};

type ProfileRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  salt: string;
  created_at: string;
};

type LocalAuthStore = {
  profiles: ProfileRow[];
};

const SESSION_COOKIE = "oni_session";
const LOCAL_STORE_DIR = path.join(process.cwd(), ".data");
const LOCAL_STORE_FILE = path.join(LOCAL_STORE_DIR, "users.json");

let randomSecret: string | null = null;

function getSecret() {
  const secret = process.env.INTERNAL_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    if (!randomSecret) {
      console.warn("WARNING: INTERNAL_SECRET is not configured in production. Generating a temporary random secret for this session/process instance.");
      randomSecret = crypto.randomBytes(32).toString("hex");
    }
    return randomSecret;
  }

  return "dev-only-secret-change-me";
}

export function isValidId(id: unknown): id is string {
  return typeof id === "string" && /^[a-zA-Z0-9-]+$/.test(id);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function safeUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function fromProfileRow(row: ProfileRow): StoredUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
    passwordHash: row.password_hash,
    salt: row.salt,
  };
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function generateId() {
  return crypto.randomUUID();
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function encodeSession(userId: string) {
  const now = Date.now();
  const payload = Buffer.from(
    JSON.stringify({
      userId,
      iat: now,
      exp: now + SESSION_LIFETIME_MS,
    })
  ).toString("base64url");
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

function decodeSession(session: string) {
  const [payload, signature] = session.split(".");
  if (!payload || !signature) return null;

  // Verify signature first (constant-time comparison prevents timing attacks)
  const expectedSignature = signPayload(payload);
  const expectedBuffer = Buffer.from(expectedSignature);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) return null;
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) return null;

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { userId?: string; iat?: number; exp?: number };

    if (
      !parsed ||
      typeof parsed.userId !== "string" ||
      typeof parsed.iat !== "number" ||
      typeof parsed.exp !== "number"
    ) return null;

    // Validate ID format to prevent injection
    if (!isValidId(parsed.userId)) return null;

    const now = Date.now();
    // Token must not be expired
    if (now > parsed.exp) return null;
    // iat must be in the past (allow 60s clock skew)
    if (parsed.iat > now + 60_000) return null;
    // exp must not be further than SESSION_LIFETIME_MS from iat (tamper check)
    if (parsed.exp - parsed.iat > SESSION_LIFETIME_MS + 60_000) return null;

    return parsed.userId;
  } catch {
    return null;
  }
}

export async function getUserFromSession(session: string | null | undefined) {
  if (!session) return null;

  const userId = decodeSession(session);
  if (!userId) return null;

  return getUserById(userId);
}

function readCookieValue(cookieHeader: string | null | undefined, name: string) {
  if (!cookieHeader) return null;
  const match = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error;
}

async function readLocalStore(): Promise<LocalAuthStore> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalAuthStore>;
    return { profiles: Array.isArray(parsed.profiles) ? parsed.profiles : [] };
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      return { profiles: [] };
    }

    throw error;
  }
}

async function writeLocalStore(store: LocalAuthStore) {
  await fs.mkdir(LOCAL_STORE_DIR, { recursive: true });
  await fs.writeFile(LOCAL_STORE_FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const email = normalizeEmail(input.email);

  if (!hasSupabaseConfig()) {
    const store = await readLocalStore();
    const existingUser = store.profiles.find((profile) => profile.email === email);

    if (existingUser) {
      return { error: "Email already in use" as const };
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const user: StoredUser = {
      id: generateId(),
      name: input.name.trim(),
      email,
      salt,
      passwordHash: hashPassword(input.password, salt),
      createdAt: new Date().toISOString(),
    };

    store.profiles.unshift({
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.passwordHash,
      salt: user.salt,
      created_at: user.createdAt,
    });

    await writeLocalStore(store);
    return { user: safeUser(user) };
  }

  const supabase = createSupabaseAdminClientOrNull();

  if (!supabase) {
    return { error: "Supabase is not configured" as const };
  }

  const { data: existingUser, error: lookupError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) {
    return { error: lookupError.message as string };
  }

  if (existingUser) {
    return { error: "Email already in use" as const };
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const user: StoredUser = {
    id: generateId(),
    name: input.name.trim(),
    email,
    salt,
    passwordHash: hashPassword(input.password, salt),
    createdAt: new Date().toISOString(),
  };

  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    name: user.name,
    email: user.email,
    password_hash: user.passwordHash,
    salt: user.salt,
    created_at: user.createdAt,
  });

  if (insertError) {
    return { error: insertError.message as string };
  }

  return { user: safeUser(user) };
}

export async function authenticateUser(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);

  if (!hasSupabaseConfig()) {
    const store = await readLocalStore();
    const user = store.profiles.find((profile) => profile.email === email);

    if (!user) return { error: "Invalid email or password" as const };

    const storedUser = fromProfileRow(user);
    const passwordHash = hashPassword(input.password, storedUser.salt);
    if (passwordHash !== storedUser.passwordHash) return { error: "Invalid email or password" as const };

    return { user: safeUser(storedUser) };
  }

  const supabase = createSupabaseAdminClientOrNull();

  if (!supabase) {
    return { error: "Supabase is not configured" as const };
  }

  const { data: user, error } = await supabase
    .from("profiles")
    .select("id, name, email, created_at, password_hash, salt")
    .eq("email", email)
    .maybeSingle<ProfileRow>();

  if (error) {
    return { error: error.message as string };
  }

  if (!user) return { error: "Invalid email or password" as const };

  const storedUser = fromProfileRow(user);
  const passwordHash = hashPassword(input.password, storedUser.salt);
  if (passwordHash !== storedUser.passwordHash) return { error: "Invalid email or password" as const };

  return { user: safeUser(storedUser) };
}

export async function getUserById(userId: string) {

  if (!hasSupabaseConfig()) {
    const store = await readLocalStore();
    const user = store.profiles.find((profile) => profile.id === userId);
    return user ? safeUser(fromProfileRow(user)) : null;
  }

  const supabase = createSupabaseAdminClientOrNull();

  if (!supabase) {
    return null;
  }

  const { data: user, error } = await supabase
    .from("profiles")
    .select("id, name, email, created_at, password_hash, salt")
    .eq("id", userId)
    .maybeSingle<ProfileRow>();

  if (error || !user) return null;

  return safeUser(fromProfileRow(user));
}

export async function getUserFromRequest(req: NextRequest | Request) {
  const cookieHeader = req.headers.get("cookie");
  const session = readCookieValue(cookieHeader, SESSION_COOKIE);
  return getUserFromSession(session);
}

export function attachSessionCookie(response: NextResponse, userId: string) {
  response.cookies.set(SESSION_COOKIE, encodeSession(userId), {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}

// Basic but strict email regex — rejects obvious garbage
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateAuthInput(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";
  const password = typeof record.password === "string" ? record.password : "";
  const confirmPassword = typeof record.confirmPassword === "string" ? record.confirmPassword : "";

  if (!EMAIL_RE.test(email)) return null;
  if (email.length > 254) return null; // RFC 5321 max
  if (password.length < 8) return null; // minimum 8 chars
  if (password.length > 128) return null; // prevent DoS via bcrypt cost
  if (name.length > 100) return null;

  return { name, email, password, confirmPassword };
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").trim();
}
