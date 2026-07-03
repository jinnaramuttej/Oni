import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export interface UserCredits {
  id: string;
  user_id: string | null;
  credits_remaining: number;
  credits_used: number;
  plan: string;
  reset_date: string;
  updated_at: string;
}

const VISITOR_HEADER = "x-visitor-id";
const FREE_CREDITS = 50;

// GET /api/credits  — returns the credit row for the visitor
export async function GET(req: Request) {
  const visitorId = req.headers.get(VISITOR_HEADER);
  if (!visitorId) {
    return NextResponse.json({ error: "Missing visitor id" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  // We store visitor-based (anonymous) credits keyed by visitor_id stored in
  // a separate text column, not auth.users. For now we use a nullable user_id
  // and identify rows by visitor_id stored in plan column prefix trick — but
  // the cleanest approach is to use a separate visitor_id text column or to
  // store credits rows with user_id = null and identify by a unique constraint
  // on an extra column. Since the migration uses user_id ref auth.users, for
  // anonymous visitors we'll use user_id = null and look up by a unique
  // `visitor_id` text column stored in the `plan` field as a workaround until
  // auth is fully wired up.
  //
  // Better approach: treat visitor_id as the key, stored in a text field.
  // We'll select rows where plan starts with the visitor_id prefix.
  // Actually the cleanest: store visitor_id in plan as "free::<visitorId>"
  // and filter by that. This is a pragmatic no-auth approach per AGENTS.md.

  const planKey = `free::${visitorId}`;

  const { data, error } = await supabase
    .from("user_credits")
    .select("*")
    .eq("plan", planKey)
    .maybeSingle();

  if (error) {
    console.error("[Credits GET] Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    // Create a fresh credit row for this visitor
    const { data: created, error: insertError } = await supabase
      .from("user_credits")
      .insert({
        user_id: null,
        credits_remaining: FREE_CREDITS,
        credits_used: 0,
        plan: planKey,
        reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("[Credits GET] Insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    if (process.env.NODE_ENV === "development" && created) {
      created.credits_remaining = 1000;
    }
    return NextResponse.json(created);
  }

  if (process.env.NODE_ENV === "development" && data && (data.credits_remaining as number) < 20) {
    try {
      const { data: updated } = await supabase
        .from("user_credits")
        .update({
          credits_remaining: 1000,
          updated_at: new Date().toISOString(),
        })
        .eq("plan", planKey)
        .select()
        .single();
      if (updated) {
        return NextResponse.json(updated);
      }
    } catch (e) {
      console.error("[Credits GET] failed to auto-recharge credits:", e);
    }
  }

  return NextResponse.json(data);
}

// POST /api/credits/deduct  — deduct credits after generation
// Body: { visitorId: string, amount: number }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.amount !== "number") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const visitorId = req.headers.get(VISITOR_HEADER) || body.visitorId;
  if (!visitorId) {
    return NextResponse.json({ error: "Missing visitor id" }, { status: 400 });
  }

  const amount: number = Math.max(0, Math.floor(body.amount));
  const planKey = `free::${visitorId}`;
  const supabase = createSupabaseAdminClient();

  // Fetch current row
  const { data: row, error: fetchError } = await supabase
    .from("user_credits")
    .select("*")
    .eq("plan", planKey)
    .maybeSingle();

  if (fetchError) {
    console.error("[Credits POST] Fetch error:", fetchError);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!row) {
    return NextResponse.json({ error: "Credits row not found" }, { status: 404 });
  }

  const newRemaining = Math.max(0, (row.credits_remaining as number) - amount);
  const newUsed = (row.credits_used as number) + amount;

  const { data: updated, error: updateError } = await supabase
    .from("user_credits")
    .update({
      credits_remaining: newRemaining,
      credits_used: newUsed,
      updated_at: new Date().toISOString(),
    })
    .eq("plan", planKey)
    .select()
    .single();

  if (updateError) {
    console.error("[Credits POST] Update error:", updateError);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}
