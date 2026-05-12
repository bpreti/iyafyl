-- ============================================================
-- IYAFYL — Seed: playoff_results 2019 (season_id = 1)
-- ============================================================
-- Winners bracket: top 4 seeds
-- Sucko Bowl: bottom 6 seeds, loser-moves-on format
-- Sucko Bowl final = GmC6 (loser of final = worst team)
-- ============================================================

insert into playoff_results (season_id, team_id, result, bracket) values

  -- Winners bracket
  (1, 7,  'champion',        'winners'),  -- Emily    | Teslaville T3SLA
  (1, 6,  'runner_up',       'winners'),  -- Merrick  | Just Here So I Don't Get Fined
  (1, 9,  'third',           'winners'),  -- Jess     | Reed it and Weep
  (1, 10, 'fourth',          'winners'),  -- John     | I Digg This Thielen

  -- Sucko Bowl
  (1, 13, 'sucko_winner',    'sucko'),    -- Megan    | Hoos Don't Lose Wahoowa (lost GmC6, 92.28 — worst team)
  (1, 4,  'sucko_runner_up', 'sucko'),    -- Tricia   | NFL Antics (won GmC6, 123.48)
  (1, 2,  'sucko_exit',      'sucko'),    -- Brianna  | JuJu on that Beat (won GmC5, eliminated)
  (1, 8,  'sucko_exit',      'sucko'),    -- Patrick  | The Pacmen (lost GmC5, eliminated)
  (1, 1,  'sucko_exit',      'sucko'),    -- Brent    | Haskins' Havoc (won GmC4, eliminated)
  (1, 3,  'sucko_exit',      'sucko');    -- Todd     | Dead Skins (lost GmC4, eliminated)
