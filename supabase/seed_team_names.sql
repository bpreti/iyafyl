-- ============================================================
-- IYAFYL — Seed: team_names
-- ============================================================

insert into team_names (id, team_id, name, start_year, end_year) values

  -- Brent (team_id 1)
  (1,  1,  'Haskins'' Havoc',                  2019, 2019),
  (2,  1,  'The No Names',                     2020, 2021),
  (3,  1,  'The Cast Aways',                   2022, 2022),
  (4,  1,  'The Team Who Lived',               2023, null),

  -- Brianna (team_id 2)
  (5,  2,  'JuJu on that Beat',                2019, 2019),
  (6,  2,  'Jr. Bacon Roethlisberger',         2020, 2020),
  (7,  2,  'Someone that I Schuster Know',     2021, 2021),
  (8,  2,  'Turn Down for Watt',               2022, 2023),
  (9,  2,  'Carry on My Heyward Son',          2024, 2024),
  (10, 2,  'Boswell that Ends Well',           2025, null),

  -- Todd (team_id 3)
  (11, 3,  'Dead Skins',                       2019, null),

  -- Tricia (team_id 4)
  (12, 4,  'NFL Antics',                       2019, null),

  -- Chris (team_id 5)
  (13, 5,  'So. Florida Sloths',               2022, null),

  -- Merrick (team_id 6)
  (14, 6,  'Just Here So I Don''t Get Fined',  2019, null),

  -- Emily (team_id 7)
  (15, 7,  'Teslaville T3SLA',                 2019, null),

  -- Patrick (team_id 8)
  (16, 8,  'The Pacmen',                       2019, 2023),
  (17, 8,  'Tomlin''s Troopers',               2024, 2024),
  (18, 8,  'Watt Am I Doing',                  2025, null),

  -- Jess (team_id 9)
  (19, 9,  'Reed it and Weep',                 2019, null),

  -- John (team_id 10)
  (20, 10, 'I Digg this Thielen',              2019, 2019),
  (21, 10, 'Cooked on a Thielen',              2020, 2022),
  (22, 10, 'KOC Pit',                          2023, null),

  -- Madeleine (team_id 11)
  (23, 11, 'Greenville Powder Puff',           2021, null),

  -- George (team_id 12)
  (24, 12, 'We''re Gonna Lose Football',       2024, 2024),
  (25, 12, 'President James K. Polk',          2025, null),

  -- Megan (team_id 13)
  (26, 13, 'Hoos'' Don''t Lose Wahoowa',       2019, 2021),

  -- Taylor (team_id 14)
  (27, 14, 'The Alphabet Mafia',               2021, 2023);

-- Keep the serial sequence in sync after explicit id inserts
select setval('team_names_id_seq', (select max(id) from team_names));
