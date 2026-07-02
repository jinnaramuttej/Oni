-- Migration: create project_brands table
create table if not exists public.project_brands (
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

-- Index for fast lookups by project_id
create index if not exists project_brands_project_id_idx on public.project_brands(project_id);

-- Enable RLS
alter table public.project_brands enable row level security;

-- Allow service role full access (server-side only)
create policy "service role full access project brands"
  on public.project_brands for all
  using (true)
  with check (true);
