-- ============================================================
-- IYAFYL Fantasy Football League — Database Schema
-- ============================================================

create table teams (
  id               serial primary key,
  slug             text unique not null,
  owner_name       text not null,
  is_active        boolean not null default true,
  joined_year      int not null,
  is_commissioner  boolean not null default false,
  is_founder       boolean not null default false,
  logo_url         text
);

create table team_names (
  id          serial primary key,
  team_id     int not null references teams(id) on delete cascade,
  name        text not null,
  start_year  int not null,
  end_year    int
);

create table seasons (
  id    serial primary key,
  year  int unique not null
);

create table games (
  id             serial primary key,
  season_id      int not null references seasons(id) on delete cascade,
  week           int not null,
  home_team_id   int not null references teams(id) on delete cascade,
  away_team_id   int not null references teams(id) on delete cascade,
  home_score     numeric(7,2) not null,
  away_score     numeric(7,2) not null,
  is_playoff     boolean not null default false,
  playoff_round  text
);

create table team_seasons (
  id              serial primary key,
  team_id         int not null references teams(id) on delete cascade,
  season_id       int not null references seasons(id) on delete cascade,
  wins            int not null default 0,
  losses          int not null default 0,
  ties            int not null default 0,
  points_for      numeric(8,2) not null default 0,
  points_against  numeric(8,2) not null default 0,
  final_standing  int not null,
  made_playoffs   boolean not null default false,
  unique(team_id, season_id)
);

create table playoff_results (
  id         serial primary key,
  season_id  int not null references seasons(id) on delete cascade,
  team_id    int not null references teams(id) on delete cascade,
  result     text not null,
  unique(season_id, team_id)
);

create table season_awards (
  id          serial primary key,
  season_id   int not null references seasons(id) on delete cascade,
  award_type  text not null,
  label       text not null,
  value       text not null,
  team_id     int references teams(id) on delete set null,
  player_name text
);
