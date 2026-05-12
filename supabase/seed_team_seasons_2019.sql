-- ============================================================
-- IYAFYL — Seed: team_seasons 2019 (season_id = 1)
-- ============================================================
-- NOTE: Update made_playoffs to true/false based on your league's
-- playoff structure (how many teams qualified in 2019).
-- ============================================================

insert into team_seasons (team_id, season_id, wins, losses, ties, points_for, points_against, final_standing, made_playoffs) values
  --  team                          season  W   L   T    PF        PA       standing  playoffs
  (7,  1,                                   9,  4,  0,  1322.56,  1215.10,  1,        true),   -- Emily    | Teslaville T3SLA
  (6,  1,                                   9,  4,  0,  1290.84,  1209.06,  2,        true),   -- Merrick  | Just Here So I Don't Get Fined
  (9,  1,                                   8,  5,  0,  1219.92,  1128.52,  3,        true),   -- Jess     | Reed it and Weep
  (10, 1,                                   8,  5,  0,  1373.50,  1278.84,  4,        true),   -- John     | I Digg This Thielen
  (1,  1,                                   6,  7,  0,  1252.00,  1155.86,  5,        false),  -- Brent    | Haskins' Havoc
  (3,  1,                                   6,  7,  0,  1283.36,  1240.92,  6,        false),  -- Todd     | Dead Skins
  (2,  1,                                   7,  6,  0,  1237.46,  1171.56,  7,        false),  -- Brianna  | JuJu on that Beat
  (8,  1,                                   2, 11,  0,  1002.26,  1327.80,  8,        false),  -- Patrick  | The Pacmen
  (4,  1,                                   6,  7,  0,  1096.62,  1185.10,  9,        false),  -- Tricia   | NFL Antics
  (13, 1,                                   4,  9,  0,   966.28,  1132.04, 10,        false);  -- Megan    | Hoos Don't Lose Wahoowa
