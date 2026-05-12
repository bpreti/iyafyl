-- ============================================================
-- IYAFYL — Seed: playoff_results 2020 (season_id = 2)
-- ============================================================
-- Winners bracket: top 4 seeds
-- Sucko Bowl: bottom 6 seeds, loser-moves-on format
-- Sucko Bowl final = GmC6 (loser of final = worst team)
-- Note: Megan wins Sucko Bowl for 2nd consecutive year
-- ============================================================

insert into playoff_results (season_id, team_id, result, bracket) values

  -- Winners bracket
  (2, 1,  'champion',        'winners'),  -- Brent    | The No Names
  (2, 3,  'runner_up',       'winners'),  -- Todd     | Dead Skins
  (2, 9,  'third',           'winners'),  -- Jess     | Reed it and Weep
  (2, 4,  'fourth',          'winners'),  -- Tricia   | NFL Antics

  -- Sucko Bowl
  (2, 13, 'sucko_winner',    'sucko'),    -- Megan    | Hoos Don't Lose Wahoowa (lost GmC6, 113.56)
  (2, 8,  'sucko_runner_up', 'sucko'),    -- Patrick  | The Pacmen (won GmC6, 187.16)
  (2, 6,  'sucko_exit',      'sucko'),    -- Merrick  | Just Here So I Don't Get Fined (won GmC4, eliminated)
  (2, 10, 'sucko_exit',      'sucko'),    -- John     | Cooked on a Thielen (lost GmC4, eliminated)
  (2, 2,  'sucko_exit',      'sucko'),    -- Brianna  | Jr Bacon Roethlisberger (won GmC5, eliminated)
  (2, 7,  'sucko_exit',      'sucko');    -- Emily    | Teslaville T3SLA (lost GmC5, eliminated)
