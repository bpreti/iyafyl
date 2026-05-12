-- ============================================================
-- IYAFYL — Seed: playoff_results 2024 (season_id = 6)
-- ============================================================
-- Top 6 winners bracket, bottom 6 Sucko Bowl.
-- Sucko Bowl final = GmC5 (loser of final = worst team)
-- Championship: Brent 143.34 def. Todd 119.78
-- GmC1: Merrick 137.78 def. Tricia 137.1 (3rd place)
-- GmC2: Emily 129.6 def. John 96.32 (5th place)
-- GmC5: Madeleine 84.74 def. Jess 71.82 → Jess = Sucko Champ
-- GmC4: Patrick 96.86 def. George 92.78 (9th place)
-- GmC3: Chris 126.98 def. Brianna 112.46 (7th place)
-- ============================================================

insert into playoff_results (season_id, team_id, result, bracket) values

  -- Winners bracket (1st–6th place)
  (6, 1,  'champion',        'winners'),  -- Brent     | The Team Who Lived (143.34 championship)
  (6, 3,  'runner_up',       'winners'),  -- Todd      | Dead Skins (119.78)
  (6, 6,  'third',           'winners'),  -- Merrick   | Just Here So I Don't Get Fined (won GmC1, 137.78)
  (6, 4,  'fourth',          'winners'),  -- Tricia    | NFL Antics (lost GmC1, 137.1)
  (6, 7,  'fifth',           'winners'),  -- Emily     | Teslaville T3SLA (won GmC2, 129.6)
  (6, 10, 'sixth',           'winners'),  -- John      | KOC Pit (lost GmC2, 96.32)

  -- Sucko Bowl (7th–12th place)
  (6, 9,  'sucko_winner',    'sucko'),    -- Jess      | Obi-Wan-Mahomie (12th, lost GmC5 71.82)
  (6, 11, 'sucko_runner_up', 'sucko'),    -- Madeleine | Greenville Powder Puff (11th, won GmC5 84.74)
  (6, 12, 'sucko_exit',      'sucko'),    -- George    | (10th, lost GmC4 92.78)
  (6, 8,  'sucko_exit',      'sucko'),    -- Patrick   | Watt Am I Doing (9th, won GmC4 96.86)
  (6, 2,  'sucko_exit',      'sucko'),    -- Brianna   | (8th, lost GmC3 112.46)
  (6, 5,  'sucko_exit',      'sucko');    -- Chris     | So. Florida Sloths (7th, won GmC3 126.98)
