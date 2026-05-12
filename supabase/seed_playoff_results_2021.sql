-- ============================================================
-- IYAFYL — Seed: playoff_results 2021 (season_id = 3)
-- ============================================================
-- Expanded to 12 teams: top 6 in winners bracket,
-- bottom 6 in Sucko Bowl with full placement games.
-- Sucko Bowl final = GmC5 (loser of final = worst team)
-- Note: Megan wins Sucko Bowl for 3rd consecutive year
-- ============================================================

insert into playoff_results (season_id, team_id, result, bracket) values

  -- Winners bracket (1st–6th place)
  (3, 9,  'champion',        'winners'),  -- Jess      | Reed it and Weep (239.12 championship)
  (3, 14, 'runner_up',       'winners'),  -- Taylor    | The Alphabet Mafia (211.52)
  (3, 1,  'third',           'winners'),  -- Brent     | The No Names (200.82, won GmC1)
  (3, 6,  'fourth',          'winners'),  -- Merrick   | Just Here So I Don't Get Fined (190.88, lost GmC1)
  (3, 8,  'fifth',           'winners'),  -- Patrick   | The Pacmen (208.36, won GmC2)
  (3, 10, 'sixth',           'winners'),  -- John      | Cooked on a Thielen (154.5, lost GmC2)

  -- Sucko Bowl (7th–12th place)
  (3, 13, 'sucko_winner',    'sucko'),    -- Megan     | Hoos Don't Lose Wahoowa (12th, lost GmC5 191.52 — 3rd consecutive Sucko title)
  (3, 4,  'sucko_runner_up', 'sucko'),    -- Tricia    | NFL Antics (11th, won GmC5 193.54)
  (3, 7,  'sucko_exit',      'sucko'),    -- Emily     | Teslaville T3SLA (10th, lost GmC4)
  (3, 2,  'sucko_exit',      'sucko'),    -- Brianna   | Somebody that I Schuster Know (9th, won GmC4)
  (3, 11, 'sucko_exit',      'sucko'),    -- Madeleine | Greenville Powder Puff (8th, lost GmC3)
  (3, 3,  'sucko_exit',      'sucko');    -- Todd      | Dead Skins (7th, won GmC3)
