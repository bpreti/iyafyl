-- ============================================================
-- IYAFYL Fantasy Football League — Database Schema
-- ============================================================

-- Teams (one row per owner, tracks current name + metadata)
create table teams (
  id           serial primary key,
  slug         text unique not null,       -- url-safe identifier e.g. "brent"
  owner_name   text not null,
  is_active    boolean not null default true,
  joined_year  int not null,
  is_commissioner boolean not null default false,
  is_founder   boolean not null default false,
  logo_url     text
);

-- Historical team names (team_id → name used during a year range)
create table team_names (
  id         serial primary key,
  team_id    int not null references teams(id) on delete cascade,
  name       text not null,
  start_year int not null,
  end_year   int             -- null means still current
);

-- Seasons
create table seasons (
  id   serial primary key,
  year int unique not null
);

-- Per-team regular season stats for a given year
create table team_seasons (
  id              serial primary key,
  team_id         int not null references teams(id) on delete cascade,
  season_id       int not null references seasons(id) on delete cascade,
  wins            int not null default 0,
  losses          int not null default 0,
  ties            int not null default 0,
  points_for      numeric(8,2) not null default 0,
  points_against  numeric(8,2) not null default 0,
  final_standing  int not null,           -- regular season finish (1 = best)
  made_playoffs   boolean not null default false,
  unique(team_id, season_id)
);

-- Playoff outcomes per team per season
create table playoff_results (
  id         serial primary key,
  season_id  int not null references seasons(id) on delete cascade,
  team_id    int not null references teams(id) on delete cascade,
  result     text not null,   -- 'champion' | 'runner_up' | 'third' | 'fourth' | 'first_round_exit'
  unique(season_id, team_id)
);

-- Season-level awards (scoring champ, mvp player, most moves, etc.)
create table season_awards (
  id          serial primary key,
  season_id   int not null references seasons(id) on delete cascade,
  award_type  text not null,  -- 'scoring_champ' | 'mvp_player' | 'most_moves' | 'most_points_against'
  label       text not null,  -- display label e.g. "Scoring Champion"
  value       text not null,  -- e.g. "1,474.2 pts" or "Josh Allen"
  team_id     int references teams(id) on delete set null,
  player_name text            -- for player-specific awards
);
