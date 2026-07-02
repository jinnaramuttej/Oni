import { NextResponse } from "next/server";
import { createSupabaseAdminClientOrNull } from "@/lib/supabase";

// One-time migration endpoint — creates the user_credits table.
// Call GET /api/migrate once to set up the database, then delete this file.
export async function GET() {
  const supabase = createSupabaseAdminClientOrNull();
  if (!supabase) {
    return NextResponse.json({ error: "No Supabase admin client" }, { status: 500 });
  }

  // Test if table exists by attempting a select
  const { error: checkError } = await supabase
    .from("user_credits")
    .select("id")
    .limit(1);

  if (!checkError) {
    return NextResponse.json({ status: "Table already exists — migration not needed." });
  }

  // Table doesn't exist — return SQL for manual execution
  const migrationSql = `
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ntsbstpbmlfukubiflfr/sql

create table if not exists public.user_credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  credits_remaining int not null default 50,
  credits_used int not null default 0,
  plan text not null default 'free',
  reset_date timestamptz not null default (now() + interval '30 days'),
  updated_at timestamptz not null default now()
);

create index if not exists user_credits_user_id_idx on public.user_credits(user_id);
alter table public.user_credits enable row level security;

-- Allow service role full access (server-side only)
create policy "service role full access"
  on public.user_credits for all
  using (true)
  with check (true);
`;

  return NextResponse.json({
    status: "Table does not exist yet. Please run the SQL below in the Supabase SQL Editor.",
    dashboardUrl: "https://supabase.com/dashboard/project/ntsbstpbmlfukubiflfr/sql/new",
    sql: migrationSql,
  });
}
