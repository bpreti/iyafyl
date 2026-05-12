-- ============================================================
-- IYAFYL — Seed: team_seasons 2025 (season_id = 7)
-- ============================================================
-- NOTE: final_standing reflects post-playoff final rankings.
-- Top 6 make playoffs in a 12-team season.
--
-- TEAM NAME CORRECTIONS NEEDED in team-names.json:
--   Jess — "Obi-Wan-Mahomie" end_year should be 2024,
--           add "Someone Take This Plunger Pls" start_year 2025, end_year null
--
-- SEASON AWARD CORRECTIONS NEEDED in season-awards.json:
--   scoring_champ    → team_id should be 4 (Tricia / NFL Antics, 1474.2 PF)
--   mvp_player       → team_id should be 5 (Chris / So. Florida Sloths, roster: Josh Allen)
-- ============================================================

insert into team_seasons (team_id, season_id, wins, losses, ties, points_for, points_against, final_standing, made_playoffs) values
  --  team                          season  W   L   T    PF        PA        standing  playoffs
  (1,  7,                                   7,  7,  0,  1394.10,  1435.40,  1,        true),   -- Brent     | The Team Who Lived
  (11, 7,                                   9,  5,  0,  1416.24,  1178.74,  2,        true),   -- Madeleine | Greenville Powder Puff
  (10, 7,                                   9,  5,  0,  1441.94,  1308.50,  3,        true),   -- John      | KOC Pit
  (3,  7,                                   8,  6,  0,  1431.32,  1429.22,  4,        true),   -- Todd      | Dead Skins
  (9,  7,                                   7,  7,  0,  1396.46,  1419.34,  5,        true),   -- Jess      | Someone Take This Plunger Pls
  (8,  7,                                   9,  5,  0,  1335.24,  1291.52,  6,        true),   -- Patrick   | Watt Am I Doing?
  (7,  7,                                   6,  8,  0,  1337.96,  1379.86,  7,        false),  -- Emily     | Teslaville T3SLA
  (2,  7,                                   6,  8,  0,  1271.68,  1348.98,  8,        false),  -- Brianna   | Boswell That Ends Well
  (6,  7,                                   6,  8,  0,  1395.68,  1493.62,  9,        false),  -- Merrick   | Just Here So I Don't Get Fined
  (12, 7,                                   7,  7,  0,  1287.18,  1354.58,  10,       false),  -- George    | President James K. Polk
  (4,  7,                                   5,  9,  0,  1474.20,  1468.72,  11,       false),  -- Tricia    | NFL Antics
  (5,  7,                                   5,  9,  0,  1308.88,  1382.40,  12,       false);  -- Chris     | So. Florida Sloths
