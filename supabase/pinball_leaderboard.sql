create extension if not exists pgcrypto;

create table if not exists public.pinball_leaderboard_runs (
  id uuid primary key default gen_random_uuid(),
  submission_key text not null unique,
  score integer not null check (score >= 0),
  player_name text not null check (char_length(btrim(player_name)) between 3 and 12),
  run_id integer not null,
  completed_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists pinball_leaderboard_runs_score_completed_idx
  on public.pinball_leaderboard_runs (score desc, completed_at asc);

alter table public.pinball_leaderboard_runs enable row level security;
