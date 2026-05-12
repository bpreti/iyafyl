-- ============================================================
-- IYAFYL — Seed: teams
-- ============================================================

insert into teams (id, slug, owner_name, is_active, joined_year, is_commissioner, is_founder, logo_url) values
  (1,  'brent',     'Brent',     true,  2019, true,  true,  null),
  (2,  'brianna',   'Brianna',   true,  2019, false, true,  null),
  (3,  'todd',      'Todd',      true,  2019, false, true,  null),
  (4,  'tricia',    'Tricia',    true,  2019, false, true,  null),
  (5,  'chris',     'Chris',     true,  2022, false, false, null),
  (6,  'merrick',   'Merrick',   true,  2019, false, true,  null),
  (7,  'emily',     'Emily',     true,  2019, false, true,  null),
  (8,  'patrick',   'Patrick',   true,  2019, false, true,  null),
  (9,  'jess',      'Jess',      true,  2019, false, true,  null),
  (10, 'john',      'John',      true,  2019, false, true,  null),
  (11, 'madeleine', 'Madeleine', true,  2021, false, false, null),
  (12, 'george',    'George',    true,  2024, false, false, null),
  (13, 'megan',     'Megan',     false, 2019, false, true,  null),
  (14, 'taylor',    'Taylor',    false, 2021, false, false, null);

-- Keep the serial sequence in sync after explicit id inserts
select setval('teams_id_seq', (select max(id) from teams));
