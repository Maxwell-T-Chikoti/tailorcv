create table if not exists profiles (
  id uuid primary key,
  email text,
  full_name text not null,
  created_at timestamptz default now()
);

create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  content jsonb not null,
  template text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists cover_letters (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid references resumes(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);