import { NextResponse } from "next/server";
import { createSupabaseAdminClientOrNull } from "@/lib/supabase";

// One-time migration endpoint — creates the user_credits and project_brands tables.
// Call GET /api/migrate once to set up the database, then delete this file.
export async function GET() {
  const supabase = createSupabaseAdminClientOrNull();
  if (!supabase) {
    return NextResponse.json({ error: "No Supabase admin client" }, { status: 500 });
  }

  // Check user_credits
  const { error: checkCreditsError } = await supabase
    .from("user_credits")
    .select("id")
    .limit(1);

  // Check project_brands
  const { error: checkBrandsError } = await supabase
    .from("project_brands")
    .select("id")
    .limit(1);

  const missingCredits = !!checkCreditsError;
  const missingBrands = !!checkBrandsError;

  if (!missingCredits && !missingBrands) {
    return NextResponse.json({ status: "All tables (user_credits, project_brands) already exist — migration not needed." });
  }

  // Generate migration SQL for whatever is missing
  let migrationSql = "-- Run this in the Supabase SQL Editor:\n-- https://supabase.com/dashboard/project/ntsbstpbmlfukubiflfr/sql\n\n";

  if (missingCredits) {
    migrationSql += `create table if not exists public.user_credits (
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

create policy "service role full access"
  on public.user_credits for all
  using (true)
  with check (true);

`;
  }

  if (missingBrands) {
    migrationSql += `create table if not exists public.project_brands (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.chats(id) on delete cascade,
  user_id uuid references auth.users(id),
  business_name text,
  industry text,
  primary_color text,
  secondary_color text,
  tone text,
  location text,
  custom_answers jsonb default '{}',
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists project_brands_project_id_idx on public.project_brands(project_id);
alter table public.project_brands enable row level security;

create policy "service role full access project brands"
  on public.project_brands for all
  using (true)
  with check (true);
`;
  }

  return NextResponse.json({
    status: "Some tables are missing. Please run the SQL below in the Supabase SQL Editor.",
    dashboardUrl: "https://supabase.com/dashboard/project/ntsbstpbmlfukubiflfr/sql/new",
    sql: migrationSql,
  });
}
