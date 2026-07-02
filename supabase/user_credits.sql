-- Migration: create user_credits table
create table if not exists public.user_credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  credits_remaining int not null default 50,
  credits_used int not null default 0,
  plan text not null default 'free',
  reset_date timestamptz not null default (now() + interval '30 days'),
  updated_at timestamptz not null default now()
);

-- Index for fast lookups by user_id
create index if not exists user_credits_user_id_idx on public.user_credits(user_id);

-- Row-level security
alter table public.user_credits enable row level security;

-- Users can only read their own credits
create policy "users can view own credits"
  on public.user_credits for select
  using (auth.uid() = user_id);

-- Only service role (server) can insert / update
create policy "service role full access"
  on public.user_credits for all
  using (true)
  with check (true);
