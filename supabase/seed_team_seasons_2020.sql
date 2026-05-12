-- ============================================================
-- IYAFYL — Seed: team_seasons 2020 (season_id = 2)
-- ============================================================
-- NOTE: final_standing reflects post-playoff final rankings
-- as shown in ESPN Final Standings (not pure regular season rank).
-- Top 4 made playoffs in a 10-team season.
-- ============================================================

insert into team_seasons (team_id, season_id, wins, losses, ties, points_for, points_against, final_standing, made_playoffs) values
  --  team                          season  W    L   T    PF        PA        standing  playoffs
  (1,  2,                                   7,   6,  0,  1321.44,  1223.00,  1,        true),   -- Brent    | The No Names
  (3,  2,                                   11,  2,  0,  1408.52,  1072.22,  2,        true),   -- Todd     | Dead Skins
  (9,  2,                                   9,   4,  0,  1346.62,  1124.90,  3,        true),   -- Jess     | Reed it and Weep
  (4,  2,                                   7,   6,  0,  1317.82,  1299.82,  4,        true),   -- Tricia   | NFL Antics
  (6,  2,                                   6,   7,  0,  1246.70,  1226.30,  5,        false),  -- Merrick  | Just Here So I Don't Get Fined
  (10, 2,                                   7,   6,  0,  1235.78,  1224.54,  6,        false),  -- John     | Cooked on a Thielen
  (2,  2,                                   6,   7,  0,  1298.14,  1363.30,  7,        false),  -- Brianna  | Jr Bacon Roethlisberger
  (7,  2,                                   5,   8,  0,  1159.70,  1262.92,  8,        false),  -- Emily    | Teslaville T3SLA
  (8,  2,                                   6,   7,  0,  1261.76,  1332.06,  9,        false),  -- Patrick  | The Pacmen
  (13, 2,                                   1,  12,  0,   916.70,  1384.12,  10,       false);  -- Megan    | Hoos Don't Lose Wahoowa
