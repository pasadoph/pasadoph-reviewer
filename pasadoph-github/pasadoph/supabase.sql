-- ============================================================
-- PasadoPH — Supabase setup
-- Run this ONCE in Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1) Profiles table: one row per user, holds the premium flag
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_premium boolean default false,
  created_at timestamptz default now()
);

-- Auto-create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) Results table: every submitted exam attempt (syncs across devices)
create table if not exists public.results (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  topic text not null,
  mode text default 'practice',       -- 'practice' or 'mock'
  score int not null,
  total int not null,
  answers jsonb,                       -- {questionId: chosenIndex}
  created_at timestamptz default now()
);

-- 3) Row Level Security: users can only see their own data
alter table public.profiles enable row level security;
alter table public.results enable row level security;

create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "insert own results" on public.results
  for insert with check (auth.uid() = user_id);

create policy "read own results" on public.results
  for select using (auth.uid() = user_id);

-- ============================================================
-- TO GRANT PREMIUM after a buyer pays:
-- Supabase → Table Editor → profiles → find their email →
-- set is_premium = true. That's it (about 30 seconds).
-- Or run:
--   update public.profiles set is_premium = true where email = 'buyer@email.com';
-- ============================================================
