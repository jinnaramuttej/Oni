import { NextResponse } from "next/server";
import { createSupabaseAdminClientOrNull, createSupabaseBrowserClientOrNull } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseAdminClientOrNull()
      : createSupabaseBrowserClientOrNull();

    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profiles: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load profiles";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}