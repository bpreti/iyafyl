-- ============================================================
-- IYAFYL — Seed: team_seasons 2021 (season_id = 3)
-- ============================================================
-- NOTE: final_standing reflects post-playoff final rankings
-- as shown in ESPN Final Standings (not pure regular season rank).
-- UPDATE made_playoffs below based on how many teams qualified in 2021.
-- ============================================================

insert into team_seasons (team_id, season_id, wins, losses, ties, points_for, points_against, final_standing, made_playoffs) values
  --  team                          season  W    L   T    PF        PA        standing  playoffs
  (9,  3,                                   11,  3,  0,  1581.10,  1336.94,  1,        true),   -- Jess      | Reed it and Weep
  (14, 3,                                   9,   6,  0,  1493.26,  1536.02,  2,        true),   -- Taylor    | The Alphabet Mafia
  (1,  3,                                   7,   8,  0,  1535.74,  1493.28,  3,        true),   -- Brent     | The No Names
  (6,  3,                                   11,  3,  0,  1508.20,  1205.36,  4,        true),   -- Merrick   | Just Here So I Don't Get Fined
  (8,  3,                                   8,   6,  0,  1412.78,  1421.68,  5,        true),   -- Patrick   | The Pacmen
  (10, 3,                                   7,   7,  0,  1479.16,  1462.72,  6,        true),   -- John      | Cooked on a Thielen
  (3,  3,                                   6,   8,  0,  1284.38,  1282.58,  7,        false),  -- Todd      | Dead Skins
  (11, 3,                                   6,   8,  0,  1491.20,  1457.34,  8,        false),  -- Madeleine | Greenville Powder Puff
  (2,  3,                                   6,   9,  0,  1411.90,  1455.42,  9,        false),  -- Brianna   | Somebody that I Schuster Know
  (7,  3,                                   7,   8,  0,  1383.96,  1432.84,  10,       false),  -- Emily     | Teslaville T3SLA
  (4,  3,                                   4,  10,  0,  1295.60,  1438.38,  11,       false),  -- Tricia    | NFL Antics
  (13, 3,                                   4,  10,  0,  1025.14,  1379.86,  12,       false);  -- Megan     | Hoos Don't Lose Wahoowa
