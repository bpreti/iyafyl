-- ============================================================
-- IYAFYL — Seed: seasons
-- ============================================================

insert into seasons (id, year) values
  (1, 2019),
  (2, 2020),
  (3, 2021),
  (4, 2022),
  (5, 2023),
  (6, 2024),
  (7, 2025);

select setval('seasons_id_seq', (select max(id) from seasons));
