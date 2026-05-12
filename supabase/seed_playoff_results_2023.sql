-- ============================================================
-- IYAFYL — Seed: playoff_results 2023 (season_id = 5)
-- ============================================================
-- Top 6 winners bracket, bottom 6 Sucko Bowl.
-- Sucko Bowl final = GmC5 (loser of final = worst team)
-- Note: Taylor exits the league as Sucko Bowl Champ (final season)
-- ============================================================

insert into playoff_results (season_id, team_id, result, bracket) values

  -- Winners bracket (1st–6th place)
  (5, 11, 'champion',        'winners'),  -- Madeleine | Greenville Powder Puff (131.4 championship)
  (5, 7,  'runner_up',       'winners'),  -- Emily     | Teslaville T3SLA (110.74)
  (5, 8,  'third',           'winners'),  -- Patrick   | Tomlin's Troopers (won GmC1, 155.84)
  (5, 5,  'fourth',          'winners'),  -- Chris     | So. Florida Sloths (lost GmC1, 65.9)
  (5, 1,  'fifth',           'winners'),  -- Brent     | The Team Who Lived (won GmC2, 93.38)
  (5, 3,  'sixth',           'winners'),  -- Todd      | Dead Skins (lost GmC2, 80.88)

  -- Sucko Bowl (7th–12th place)
  (5, 14, 'sucko_winner',    'sucko'),    -- Taylor    | The Alphabet Mafia (12th, lost GmC5 119.16 — final season)
  (5, 6,  'sucko_runner_up', 'sucko'),    -- Merrick   | Just Here So I Don't Get Fined (11th, won GmC5 122.82)
  (5, 2,  'sucko_exit',      'sucko'),    -- Brianna   | Straight Outta Tomlin (10th, lost GmC4 56.5)
  (5, 4,  'sucko_exit',      'sucko'),    -- Tricia    | NFL Antics (9th, won GmC4 93.78)
  (5, 10, 'sucko_exit',      'sucko'),    -- John      | KOC Pit (8th, lost GmC3 92.68)
  (5, 9,  'sucko_exit',      'sucko');    -- Jess      | Obi-Wan-Mahomie (7th, won GmC3 104.56)
