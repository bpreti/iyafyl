-- ============================================================
-- IYAFYL — Seed: playoff_results 2025 (season_id = 7)
-- ============================================================
-- Top 6 winners bracket, bottom 6 Sucko Bowl.
-- Sucko Bowl final = GmC5 (loser of final = worst team)
-- Note: Brent back-to-back champion (2024 & 2025)
-- Championship: Brent 116.48 def. Madeleine 108.92
-- GmC1: John 122.08 def. Todd 120.74 (3rd place)
-- GmC2: Jess 110.8 def. Patrick 95.16 (5th place)
-- GmC5: Tricia 101.8 def. Chris 86.68 → Chris = Sucko Champ
-- GmC4: Merrick 100.6 def. George 59.48 (9th place)
-- GmC3: Emily 92.72 def. Brianna 68.08 (7th place)
-- ============================================================

insert into playoff_results (season_id, team_id, result, bracket) values

  -- Winners bracket (1st–6th place)
  (7, 1,  'champion',        'winners'),  -- Brent     | The Team Who Lived (116.48 championship)
  (7, 11, 'runner_up',       'winners'),  -- Madeleine | Greenville Powder Puff (108.92)
  (7, 10, 'third',           'winners'),  -- John      | KOC Pit (won GmC1, 122.08)
  (7, 3,  'fourth',          'winners'),  -- Todd      | Dead Skins (lost GmC1, 120.74)
  (7, 9,  'fifth',           'winners'),  -- Jess      | Someone Take This Plunger Pls (won GmC2, 110.8)
  (7, 8,  'sixth',           'winners'),  -- Patrick   | Watt Am I Doing? (lost GmC2, 95.16)

  -- Sucko Bowl (7th–12th place)
  (7, 5,  'sucko_winner',    'sucko'),    -- Chris     | So. Florida Sloths (12th, lost GmC5 86.68)
  (7, 4,  'sucko_runner_up', 'sucko'),    -- Tricia    | NFL Antics (11th, won GmC5 101.8)
  (7, 12, 'sucko_exit',      'sucko'),    -- George    | President James K. Polk (10th, lost GmC4 59.48)
  (7, 6,  'sucko_exit',      'sucko'),    -- Merrick   | Just Here So I Don't Get Fined (9th, won GmC4 100.6)
  (7, 2,  'sucko_exit',      'sucko'),    -- Brianna   | Boswell That Ends Well (8th, lost GmC3 68.08)
  (7, 7,  'sucko_exit',      'sucko');    -- Emily     | Teslaville T3SLA (7th, won GmC3 92.72)
