-- ============================================================
-- IYAFYL — Seed: team_seasons 2024 (season_id = 6)
-- ============================================================
-- NOTE: final_standing reflects post-playoff final rankings.
-- Top 6 make playoffs in a 12-team season.
-- George (team_id 12) joins the league this season.
--
-- TEAM NAME CORRECTIONS NEEDED in team-names.json:
--   George   — update "We're Gonna Lose Football" to match
--              exact ESPN name "George: Weregonnalose football"
-- ============================================================

insert into team_seasons (team_id, season_id, wins, losses, ties, points_for, points_against, final_standing, made_playoffs) values
  --  team                          season  W    L   T    PF        PA        standing  playoffs
  (1,  6,                                   8,   6,  0,  1568.94,  1455.40,  1,        true),   -- Brent     | The Team Who Lived
  (3,  6,                                   10,  4,  0,  1422.90,  1327.02,  2,        true),   -- Todd      | Dead Skins
  (6,  6,                                   10,  4,  0,  1708.30,  1416.70,  3,        true),   -- Merrick   | Just Here So I Don't Get Fined
  (4,  6,                                   8,   6,  0,  1327.94,  1379.56,  4,        true),   -- Tricia    | NFL Antics
  (7,  6,                                   9,   5,  0,  1450.64,  1446.24,  5,        true),   -- Emily     | Teslaville T3SLA
  (10, 6,                                   8,   6,  0,  1546.86,  1377.78,  6,        true),   -- John      | KOC Pit
  (5,  6,                                   7,   7,  0,  1453.72,  1431.34,  7,        false),  -- Chris     | So. Florida Sloths
  (2,  6,                                   7,   7,  0,  1414.30,  1364.70,  8,        false),  -- Brianna   | Carry on My Heyward Son
  (8,  6,                                   4,  10,  0,  1178.30,  1488.60,  9,        false),  -- Patrick   | Tomlin's Troopers
  (12, 6,                                   4,  10,  0,  1281.42,  1449.98,  10,       false),  -- George    | George: Weregonnalose football
  (11, 6,                                   5,   9,  0,  1265.22,  1379.80,  11,       false),  -- Madeleine | Greenville Powder Puff
  (9,  6,                                   4,  10,  0,  1225.34,  1326.76,  12,       false);  -- Jess      | Obi-Wan-Mahomie
