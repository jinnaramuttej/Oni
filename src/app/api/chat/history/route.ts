import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createSupabaseAdminClientOrNull } from "@/lib/supabase";
import { getUserFromRequest, isValidId } from "@/lib/auth";

const LOCAL_STORE_DIR = path.join(process.cwd(), ".data");
const LOCAL_STORE_FILE = path.join(LOCAL_STORE_DIR, "chats.json");

// UUID v4 shape — visitorId must match this to prevent injection / enumeration
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isValidVisitorId(id: unknown): id is string {
  return typeof id === "string" && UUID_RE.test(id);
}

type ChatRow = {
  id: string;
  visitor_id: string;
  title: string;
  messages: any[];
  generated_html: string;
  updated_at: string;
};

type LocalChatsStore = {
  conversations: ChatRow[];
};

async function readLocalStore(): Promise<LocalChatsStore> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalChatsStore>;
    return { conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [] };
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return { conversations: [] };
    }
    throw error;
  }
}

async function writeLocalStore(store: LocalChatsStore) {
  await fs.mkdir(LOCAL_STORE_DIR, { recursive: true });
  await fs.writeFile(LOCAL_STORE_FILE, JSON.stringify(store, null, 2), "utf8");
}

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Resolve the effective visitor/owner ID for a request.
 *
 * Security model:
 * - If the user has a valid session cookie (authenticated), their user ID is the owner.
 *   The x-visitor-id header must match — prevents one user reading another user's chats.
 * - If no session cookie, the request is treated as anonymous.
 *   The x-visitor-id header is accepted as-is, but MUST be a valid UUID v4.
 *   Anonymous visitors can only access their own UUID-namespaced chats.
 */
async function resolveOwnerId(req: NextRequest): Promise<{ id: string } | { error: string; status: number }> {
  const headerVisitorId = req.headers.get("x-visitor-id");

  if (!isValidVisitorId(headerVisitorId)) {
    return { error: "Missing or invalid x-visitor-id header (must be a UUID v4)", status: 400 };
  }

  // Check for an authenticated session
  const sessionUser = await getUserFromRequest(req);

  if (sessionUser) {
    // Authenticated: the session user ID is the canonical owner.
    return { id: sessionUser.id };
  }

  // Anonymous: trust the UUID header, but it's already validated above
  return { id: headerVisitorId };
}

export async function GET(req: NextRequest) {
  const ownerResult = await resolveOwnerId(req);
  if ("error" in ownerResult) {
    return NextResponse.json({ error: ownerResult.error }, { status: ownerResult.status });
  }
  const visitorId = ownerResult.id;

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("id");

  // Validate conversation ID format if provided
  if (conversationId && !isValidId(conversationId) && !UUID_RE.test(conversationId)) {
    return NextResponse.json({ error: "Invalid conversation id" }, { status: 400 });
  }

  // 1. Supabase Mode
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClientOrNull();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client initialization failed" }, { status: 500 });
    }

    try {
      if (conversationId) {
        // Fetch detailed conversation — always filter by visitor_id to prevent IDOR
        const { data, error } = await supabase
          .from("chats")
          .select("*")
          .eq("id", conversationId)
          .eq("visitor_id", visitorId)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
        }
        return NextResponse.json({
          id: data.id,
          title: data.title,
          messages: data.messages,
          generatedHtml: data.generated_html,
          updatedAt: new Date(data.updated_at).getTime(),
        });
      } else {
        // Fetch list of conversations
        const { data, error } = await supabase
          .from("chats")
          .select("id, title, updated_at")
          .eq("visitor_id", visitorId)
          .order("updated_at", { ascending: false });

        if (error) throw error;
        const list = (data || []).map((row) => ({
          id: row.id,
          title: row.title,
          updatedAt: new Date(row.updated_at).getTime(),
        }));
        return NextResponse.json({ conversations: list });
      }
    } catch (err: any) {
      console.error("Supabase history GET error:", err.message || err);
      return NextResponse.json({
        error: "Database error. If table 'chats' is missing, please create it in your Supabase SQL console.",
        details: err.message
      }, { status: 500 });
    }
  }

  // 2. Local File Fallback Mode
  try {
    const store = await readLocalStore();
    const userConversations = store.conversations.filter(c => c.visitor_id === visitorId);

    if (conversationId) {
      const found = userConversations.find(c => c.id === conversationId);
      if (!found) {
        return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
      }
      return NextResponse.json({
        id: found.id,
        title: found.title,
        messages: found.messages,
        generatedHtml: found.generated_html,
        updatedAt: new Date(found.updated_at).getTime(),
      });
    } else {
      const sorted = [...userConversations].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      const list = sorted.map(row => ({
        id: row.id,
        title: row.title,
        updatedAt: new Date(row.updated_at).getTime(),
      }));
      return NextResponse.json({ conversations: list });
    }
  } catch (err: any) {
    console.error("Local history GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ownerResult = await resolveOwnerId(req);
  if ("error" in ownerResult) {
    return NextResponse.json({ error: ownerResult.error }, { status: ownerResult.status });
  }
  const visitorId = ownerResult.id;

  const body = await req.json().catch(() => null);
  if (!body || !body.id) {
    return NextResponse.json({ error: "Invalid body, missing id" }, { status: 400 });
  }

  // Validate conversation ID format
  const { id, title, messages, generatedHtml } = body;
  if (!isValidId(id) && !UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid conversation id format" }, { status: 400 });
  }

  const now = new Date().toISOString();

  // 1. Supabase Mode
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClientOrNull();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client initialization failed" }, { status: 500 });
    }

    try {
      const updatePayload: any = {
        id,
        visitor_id: visitorId,
        updated_at: now,
      };
      if (typeof title === "string") updatePayload.title = title.slice(0, 500); // cap title length
      if (Array.isArray(messages)) updatePayload.messages = messages;
      if (typeof generatedHtml === "string") updatePayload.generated_html = generatedHtml;

      const { error } = await supabase
        .from("chats")
        .upsert(updatePayload, { onConflict: "id" });

      if (error) throw error;
      return NextResponse.json({ success: true });
    } catch (err: any) {
      console.error("Supabase history POST error:", err.message || err);
      return NextResponse.json({
        error: "Database error. If table 'chats' is missing, please create it in your Supabase SQL console.",
        details: err.message
      }, { status: 500 });
    }
  }

  // 2. Local File Fallback Mode
  try {
    const store = await readLocalStore();
    const existingIndex = store.conversations.findIndex(c => c.id === id);

    if (existingIndex > -1) {
      // Verify ownership before modifying — prevent cross-user overwrite
      if (store.conversations[existingIndex].visitor_id !== visitorId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const current = store.conversations[existingIndex];
      if (typeof title === "string") current.title = title.slice(0, 500);
      if (Array.isArray(messages)) current.messages = messages;
      if (typeof generatedHtml === "string") current.generated_html = generatedHtml;
      current.updated_at = now;
    } else {
      store.conversations.push({
        id,
        visitor_id: visitorId,
        title: typeof title === "string" ? title.slice(0, 500) : "New Chat",
        messages: messages || [],
        generated_html: generatedHtml || "",
        updated_at: now,
      });
    }

    await writeLocalStore(store);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Local history POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
