-- ============================================================
-- IYAFYL — Seed: team_seasons 2023 (season_id = 5)
-- ============================================================
-- NOTE: final_standing reflects post-playoff final rankings.
-- Top 6 make playoffs in a 12-team season.
--
-- TEAM NAME CORRECTIONS NEEDED in team-names.json:
--   Jess     — "Reed it and Weep" end_year should be 2022,
--              add "Obi-Wan-Mahomie" start_year 2023, end_year null
--   Brianna  — "Turn Down for Watt" end_year should be 2022,
--              add "Straight Outta Tomlin" start_year 2023, end_year 2023
--   Patrick  — "Life's a Mitch" end_year 2022,
--              "Tomlin's Troopers" start_year should be 2023 (not 2024)
-- ============================================================

insert into team_seasons (team_id, season_id, wins, losses, ties, points_for, points_against, final_standing, made_playoffs) values
  --  team                          season  W    L   T    PF        PA        standing  playoffs
  (11, 5,                                   10,  4,  0,  1527.06,  1294.98,  1,        true),   -- Madeleine | Greenville Powder Puff
  (7,  5,                                   11,  3,  0,  1515.50,  1388.64,  2,        true),   -- Emily     | Teslaville T3SLA
  (8,  5,                                   7,   7,  0,  1442.58,  1297.12,  3,        true),   -- Patrick   | Tomlin's Troopers
  (5,  5,                                   8,   6,  0,  1411.68,  1388.22,  4,        true),   -- Chris     | So. Florida Sloths
  (1,  5,                                   7,   7,  0,  1436.92,  1430.18,  5,        true),   -- Brent     | The Team Who Lived
  (3,  5,                                   9,   5,  0,  1486.74,  1340.38,  6,        true),   -- Todd      | Dead Skins
  (9,  5,                                   7,   7,  0,  1347.26,  1359.20,  7,        false),  -- Jess      | Obi-Wan-Mahomie
  (10, 5,                                   7,   7,  0,  1403.22,  1366.74,  8,        false),  -- John      | KOC Pit
  (4,  5,                                   3,  11,  0,  1120.98,  1382.72,  9,        false),  -- Tricia    | NFL Antics
  (2,  5,                                   4,  10,  0,  1196.50,  1513.12,  10,       false),  -- Brianna   | Straight Outta Tomlin
  (6,  5,                                   7,   7,  0,  1323.54,  1372.84,  11,       false),  -- Merrick   | Just Here So I Don't Get Fined
  (14, 5,                                   4,  10,  0,  1366.84,  1444.68,  12,       false);  -- Taylor    | The Alphabet Mafia
