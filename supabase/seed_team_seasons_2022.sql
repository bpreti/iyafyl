-- ============================================================
-- IYAFYL — Seed: team_seasons 2022 (season_id = 4)
-- ============================================================
-- NOTE: final_standing reflects post-playoff final rankings.
-- Top 6 make playoffs in a 12-team season.
-- NOTE: Patrick's 2022 team name is "Life's a Mitch" — update
-- team-names.json to split "The Pacmen" entry accordingly.
-- ============================================================

insert into team_seasons (team_id, season_id, wins, losses, ties, points_for, points_against, final_standing, made_playoffs) values
  --  team                          season  W    L   T    PF        PA        standing  playoffs
  (14, 4,                                   11,  3,  0,  1451.74,  1294.42,  1,        true),   -- Taylor    | The Alphabet Mafia
  (6,  4,                                   11,  3,  0,  1467.06,  1270.00,  2,        true),   -- Merrick   | Just Here So I Don't Get Fined
  (4,  4,                                   8,   6,  0,  1461.44,  1462.98,  3,        true),   -- Tricia    | NFL Antics
  (10, 4,                                   10,  4,  0,  1458.08,  1293.78,  4,        true),   -- John      | Cooked on a Thielen
  (5,  4,                                   7,   7,  0,  1438.30,  1431.22,  5,        true),   -- Chris     | So. Florida Sloths
  (3,  4,                                   7,   7,  0,  1355.22,  1377.68,  6,        true),   -- Todd      | Dead Skins
  (2,  4,                                   7,   7,  0,  1317.96,  1232.70,  7,        false),  -- Brianna   | Turn Down for Watt
  (9,  4,                                   5,   9,  0,  1392.84,  1410.12,  8,        false),  -- Jess      | Reed it and Weep
  (1,  4,                                   5,   9,  0,  1363.02,  1441.16,  9,        false),  -- Brent     | The Cast Aways
  (8,  4,                                   6,   8,  0,  1347.40,  1402.86,  10,       false),  -- Patrick   | Life's a Mitch
  (11, 4,                                   4,  10,  0,  1221.66,  1404.52,  11,       false),  -- Madeleine | Greenville Powder Puff
  (7,  4,                                   3,  11,  0,  1131.68,  1384.96,  12,       false);  -- Emily     | Teslaville T3SLA
