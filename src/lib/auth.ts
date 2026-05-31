import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

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

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SESSION_COOKIE = "oni_session";

function getSecret() {
  return process.env.INTERNAL_SECRET || "dev-only-secret-change-me";
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

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readUsers(): Promise<StoredUser[]> {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
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

function encodeSession(userId: string) {
  const payload = Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString("base64url");
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

function decodeSession(session: string) {
  const [payload, signature] = session.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = signPayload(payload);
  const expectedBuffer = Buffer.from(expectedSignature);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) return null;
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { userId?: string };
    return typeof parsed.userId === "string" ? parsed.userId : null;
  } catch {
    return null;
  }
}

function readCookieValue(cookieHeader: string | null | undefined, name: string) {
  if (!cookieHeader) return null;
  const match = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const users = await readUsers();
  const email = normalizeEmail(input.email);

  if (users.some((user) => normalizeEmail(user.email) === email)) {
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

  users.push(user);
  await writeUsers(users);

  return { user: safeUser(user) };
}

export async function authenticateUser(input: { email: string; password: string }) {
  const users = await readUsers();
  const email = normalizeEmail(input.email);
  const user = users.find((entry) => normalizeEmail(entry.email) === email);

  if (!user) return { error: "Invalid email or password" as const };

  const passwordHash = hashPassword(input.password, user.salt);
  if (passwordHash !== user.passwordHash) return { error: "Invalid email or password" as const };

  return { user: safeUser(user) };
}

export async function getUserById(userId: string) {
  const users = await readUsers();
  const user = users.find((entry) => entry.id === userId);
  return user ? safeUser(user) : null;
}

export async function getUserFromRequest(req: NextRequest | Request) {
  const cookieHeader = req.headers.get("cookie");
  const session = readCookieValue(cookieHeader, SESSION_COOKIE);
  if (!session) return null;

  const userId = decodeSession(session);
  if (!userId) return null;

  return getUserById(userId);
}

export function attachSessionCookie(response: NextResponse, userId: string) {
  response.cookies.set(SESSION_COOKIE, encodeSession(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}

export function validateAuthInput(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const password = typeof record.password === "string" ? record.password : "";
  const confirmPassword = typeof record.confirmPassword === "string" ? record.confirmPassword : "";

  if (email.length < 3 || !email.includes("@")) return null;
  if (password.length < 6) return null;

  return { name, email, password, confirmPassword };
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").trim();
}
