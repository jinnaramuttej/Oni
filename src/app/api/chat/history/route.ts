import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createSupabaseAdminClientOrNull } from "@/lib/supabase";

const LOCAL_STORE_DIR = path.join(process.cwd(), ".data");
const LOCAL_STORE_FILE = path.join(LOCAL_STORE_DIR, "chats.json");

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

export async function GET(req: NextRequest) {
  const visitorId = req.headers.get("x-visitor-id");
  if (!visitorId) {
    return NextResponse.json({ error: "Missing x-visitor-id header" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("id");

  // 1. Supabase Mode
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClientOrNull();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client initialization failed" }, { status: 500 });
    }

    try {
      if (conversationId) {
        // Fetch detailed conversation
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
  const visitorId = req.headers.get("x-visitor-id");
  if (!visitorId) {
    return NextResponse.json({ error: "Missing x-visitor-id header" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.id) {
    return NextResponse.json({ error: "Invalid body, missing id" }, { status: 400 });
  }

  const { id, title, messages, generatedHtml } = body;
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
      if (typeof title === "string") updatePayload.title = title;
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
      const current = store.conversations[existingIndex];
      if (typeof title === "string") current.title = title;
      if (Array.isArray(messages)) current.messages = messages;
      if (typeof generatedHtml === "string") current.generated_html = generatedHtml;
      current.updated_at = now;
    } else {
      store.conversations.push({
        id,
        visitor_id: visitorId,
        title: title || "New Chat",
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
