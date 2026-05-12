-- ============================================================
-- IYAFYL — Seed: playoff_results 2022 (season_id = 4)
-- ============================================================
-- Top 6 winners bracket, bottom 6 Sucko Bowl.
-- Sucko Bowl final = GmC5 (loser of final = worst team)
-- Note: Emily ends Megan's 3-year Sucko streak
-- ============================================================

insert into playoff_results (season_id, team_id, result, bracket) values

  -- Winners bracket (1st–6th place)
  (4, 14, 'champion',        'winners'),  -- Taylor    | The Alphabet Mafia
  (4, 6,  'runner_up',       'winners'),  -- Merrick   | Just Here So I Don't Get Fined
  (4, 4,  'third',           'winners'),  -- Tricia    | NFL Antics (won GmC1, 126.12)
  (4, 10, 'fourth',          'winners'),  -- John      | Cooked on a Thielen (lost GmC1)
  (4, 5,  'fifth',           'winners'),  -- Chris     | So. Florida Sloths (won GmC2, 99.22)
  (4, 3,  'sixth',           'winners'),  -- Todd      | Dead Skins (lost GmC2)

  -- Sucko Bowl (7th–12th place)
  (4, 7,  'sucko_winner',    'sucko'),    -- Emily     | Teslaville T3SLA (12th, lost GmC5 66.48)
  (4, 11, 'sucko_runner_up', 'sucko'),    -- Madeleine | Greenville Powder Puff (11th, won GmC5 77.18)
  (4, 8,  'sucko_exit',      'sucko'),    -- Patrick   | Life's a Mitch (10th, lost GmC4)
  (4, 1,  'sucko_exit',      'sucko'),    -- Brent     | The Cast Aways (9th, won GmC4)
  (4, 9,  'sucko_exit',      'sucko'),    -- Jess      | Reed it and Weep (8th, lost GmC3)
  (4, 2,  'sucko_exit',      'sucko');    -- Brianna   | Turn Down for Watt (7th, won GmC3)
