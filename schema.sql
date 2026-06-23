-- Supabase Database Schema for Deidara TV
-- Run this script in the Supabase SQL Editor to set up the database tables and security policies.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. MATCHES TABLE
-- ==========================================
create table if not exists public.matches (
  id uuid primary key default uuid_generate_v4(),
  api_football_id integer unique,
  slug text not null unique,
  team_a text not null,
  team_b text not null,
  team_a_logo text,
  team_b_logo text,
  score_a integer not null default 0,
  score_b integer not null default 0,
  status text not null default 'NS', -- 'NS' (Not Started), 'LIVE', 'FT' (Finished)
  is_manual boolean not null default false,
  start_time timestamptz not null,
  league text,
  channel text,
  servers jsonb not null default '[]'::jsonb, -- Array of {name: text, url: text}
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexing for fast search and slug routes
create index if not exists matches_slug_idx on public.matches(slug);
create index if not exists matches_start_time_idx on public.matches(start_time);
create index if not exists matches_status_idx on public.matches(status);

-- ==========================================
-- 2. BLOGS TABLE
-- ==========================================
create table if not exists public.blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content text not null, -- HTML or Markdown content
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexing for blog slug routes
create index if not exists blogs_slug_idx on public.blogs(slug);
create index if not exists blogs_created_at_idx on public.blogs(created_at desc);

-- ==========================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable Row Level Security
alter table public.matches enable row level security;
alter table public.blogs enable row level security;

-- Read policies: Anyone can view matches and blogs
create policy "Allow public read access to matches"
  on public.matches for select
  using (true);

create policy "Allow public read access to blogs"
  on public.blogs for select
  using (true);

-- Write policies: Only authenticated users (admins) can create, update, or delete matches/blogs
create policy "Allow authenticated admin full access to matches"
  on public.matches for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated admin full access to blogs"
  on public.blogs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ==========================================
-- 4. AUTO-UPDATE UPDATED_AT TRIGGER
-- ==========================================
create or replace function public.handle_update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_matches_updated_at
  before update on public.matches
  for each row
  execute function public.handle_update_timestamp();

create trigger set_blogs_updated_at
  before update on public.blogs
  for each row
  execute function public.handle_update_timestamp();
