import { Team, TeamName, Season, TeamSeason, PlayoffResult, SeasonAward } from '@/types'

export const teams: Team[] = [
  { id: 1,  slug: 'brent',     owner_name: 'Brent',     is_active: true,  joined_year: 2019, is_commissioner: true,  is_founder: true,  logo_url: null },
  { id: 2,  slug: 'brianna',   owner_name: 'Brianna',   is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 3,  slug: 'todd',      owner_name: 'Todd',      is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 4,  slug: 'tricia',    owner_name: 'Tricia',    is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 5,  slug: 'chris',     owner_name: 'Chris',     is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 6,  slug: 'merrick',   owner_name: 'Merrick',   is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 7,  slug: 'emily',     owner_name: 'Emily',     is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 8,  slug: 'patrick',   owner_name: 'Patrick',   is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 9,  slug: 'jess',      owner_name: 'Jess',      is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 10, slug: 'john',      owner_name: 'John',      is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 11, slug: 'madeleine', owner_name: 'Madeleine', is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 12, slug: 'george',    owner_name: 'George',    is_active: true,  joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 13, slug: 'megan',     owner_name: 'Megan',     is_active: false, joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
  { id: 14, slug: 'taylor',    owner_name: 'Taylor',    is_active: false, joined_year: 2019, is_commissioner: false, is_founder: false, logo_url: null },
]

export const teamNames: TeamName[] = [
  // Brent
  { id: 1,  team_id: 1,  name: "Haskins' Havoc",      start_year: 2019, end_year: 2019 },
  { id: 2,  team_id: 1,  name: 'The No Names',         start_year: 2020, end_year: 2021 },
  { id: 3,  team_id: 1,  name: 'The Cast Aways',       start_year: 2022, end_year: 2022 },
  { id: 4,  team_id: 1,  name: 'The Team Who Lived',   start_year: 2023, end_year: null },
  // Brianna
  { id: 5,  team_id: 2,  name: 'Greenville Powder Puff', start_year: 2019, end_year: null },
  // Todd
  { id: 6,  team_id: 3,  name: 'KOC Pit',              start_year: 2019, end_year: null },
  // Tricia
  { id: 7,  team_id: 4,  name: 'So. Florida Sloths',   start_year: 2019, end_year: null },
  // Chris
  { id: 8,  team_id: 5,  name: 'NFL Antics',           start_year: 2019, end_year: null },
  // Merrick
  { id: 9,  team_id: 6,  name: 'Just Here So I Don\'t Get Fined', start_year: 2019, end_year: null },
  // Emily
  { id: 10, team_id: 7,  name: 'Placeholder Emily FC', start_year: 2019, end_year: null },
  // Patrick
  { id: 11, team_id: 8,  name: 'Placeholder Patrick XI', start_year: 2019, end_year: null },
  // Jess
  { id: 12, team_id: 9,  name: 'Placeholder Jess United', start_year: 2019, end_year: null },
  // John
  { id: 13, team_id: 10, name: 'Placeholder John FC',  start_year: 2019, end_year: null },
  // Madeleine
  { id: 14, team_id: 11, name: 'Placeholder Madeleine SC', start_year: 2019, end_year: null },
  // George
  { id: 15, team_id: 12, name: 'Placeholder George Athletic', start_year: 2019, end_year: null },
  // Megan (defunct)
  { id: 16, team_id: 13, name: 'Placeholder Megan FC', start_year: 2019, end_year: 2021 },
  // Taylor (defunct)
  { id: 17, team_id: 14, name: 'Placeholder Taylor FC', start_year: 2019, end_year: 2022 },
]

export const seasons: Season[] = [
  { id: 1, year: 2019 },
  { id: 2, year: 2020 },
  { id: 3, year: 2021 },
  { id: 4, year: 2022 },
  { id: 5, year: 2023 },
  { id: 6, year: 2024 },
  { id: 7, year: 2025 },
]

export const teamSeasons: (TeamSeason & { season: Season })[] = [
  // 2025 season — Brent (champion per homepage)
  { id: 1, team_id: 1, season_id: 7, wins: 8, losses: 6, ties: 0, points_for: 1350.0, points_against: 1280.0, final_standing: 1, made_playoffs: true, season: { id: 7, year: 2025 } },
  // placeholder rows for other teams — replace with real data
  { id: 2, team_id: 2, season_id: 7, wins: 7, losses: 7, ties: 0, points_for: 1320.0, points_against: 1300.0, final_standing: 2, made_playoffs: true, season: { id: 7, year: 2025 } },
  { id: 3, team_id: 3, season_id: 7, wins: 6, losses: 8, ties: 0, points_for: 1290.0, points_against: 1310.0, final_standing: 3, made_playoffs: true, season: { id: 7, year: 2025 } },
  { id: 4, team_id: 4, season_id: 7, wins: 9, losses: 5, ties: 0, points_for: 1474.2, points_against: 1493.62, final_standing: 4, made_playoffs: true, season: { id: 7, year: 2025 } },
  { id: 5, team_id: 5, season_id: 7, wins: 10, losses: 4, ties: 0, points_for: 1474.2, points_against: 1200.0, final_standing: 5, made_playoffs: false, season: { id: 7, year: 2025 } },
  { id: 6, team_id: 6, season_id: 7, wins: 5, losses: 9, ties: 0, points_for: 1200.0, points_against: 1493.62, final_standing: 6, made_playoffs: false, season: { id: 7, year: 2025 } },
]

export const playoffResults: (PlayoffResult & { season: Season })[] = [
  // 2025
  { id: 1, season_id: 7, team_id: 1, result: 'champion',   season: { id: 7, year: 2025 } },
  { id: 2, season_id: 7, team_id: 2, result: 'runner_up',  season: { id: 7, year: 2025 } },
  { id: 3, season_id: 7, team_id: 3, result: 'third',      season: { id: 7, year: 2025 } },
  // 2024 — Brent was champion per team page
  { id: 4, season_id: 6, team_id: 1, result: 'champion',   season: { id: 6, year: 2024 } },
  // 2020 — Brent was champion per team page
  { id: 5, season_id: 2, team_id: 1, result: 'champion',   season: { id: 2, year: 2020 } },
  // 2021 — Brent was third per team page
  { id: 6, season_id: 3, team_id: 1, result: 'third',      season: { id: 3, year: 2021 } },
]

export const seasonAwards: (SeasonAward & { team?: Team })[] = [
  {
    id: 1, season_id: 7, award_type: 'scoring_champ', label: 'Scoring Champion',
    value: '1,474.2 pts', team_id: 5, player_name: null,
    team: teams.find(t => t.id === 5),
  },
  {
    id: 2, season_id: 7, award_type: 'mvp_player', label: 'Fantasy Player MVP',
    value: 'Josh Allen', team_id: 4, player_name: 'Josh Allen',
    team: teams.find(t => t.id === 4),
  },
  {
    id: 3, season_id: 7, award_type: 'most_moves', label: 'Most Roster Moves',
    value: '53 moves', team_id: 1, player_name: null,
    team: teams.find(t => t.id === 1),
  },
  {
    id: 4, season_id: 7, award_type: 'most_points_against', label: 'Most Points Against',
    value: '1,493.62 pts', team_id: 6, player_name: null,
    team: teams.find(t => t.id === 6),
  },
]

// Helpers
export function getTeamCurrentName(teamId: number): string {
  const names = teamNames
    .filter(n => n.team_id === teamId)
    .sort((a, b) => b.start_year - a.start_year)
  return names[0]?.name ?? 'Unknown'
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find(t => t.slug === slug)
}

export function getTeamNamesById(teamId: number): TeamName[] {
  return teamNames
    .filter(n => n.team_id === teamId)
    .sort((a, b) => a.start_year - b.start_year)
}

export function getTeamSeasonsById(teamId: number) {
  return teamSeasons.filter(ts => ts.team_id === teamId)
}

export function getPlayoffResultsByTeamId(teamId: number) {
  return playoffResults.filter(pr => pr.team_id === teamId)
}

export function getSeasonAwardsBySeason(seasonId: number) {
  return seasonAwards.filter(a => a.season_id === seasonId)
}

export function computeCareerStats(teamId: number) {
  const ts = teamSeasons.filter(t => t.team_id === teamId)
  const wins = ts.reduce((s, t) => s + t.wins, 0)
  const losses = ts.reduce((s, t) => s + t.losses, 0)
  const ties = ts.reduce((s, t) => s + t.ties, 0)
  const pf = ts.reduce((s, t) => s + Number(t.points_for), 0)
  const pa = ts.reduce((s, t) => s + Number(t.points_against), 0)
  const gamesPlayed = wins + losses + ties
  const playoffAppearances = ts.filter(t => t.made_playoffs).length
  const championships = playoffResults.filter(
    pr => pr.team_id === teamId && pr.result === 'champion'
  ).length

  const pResults = playoffResults.filter(pr => pr.team_id === teamId)
  const playoffWins = pResults.filter(r => r.result === 'champion').length * 2 +
    pResults.filter(r => r.result === 'runner_up').length * 1 +
    pResults.filter(r => r.result === 'third').length * 1
  const playoffLosses = pResults.filter(r => r.result === 'runner_up' || r.result === 'first_round_exit').length +
    pResults.filter(r => r.result === 'third' || r.result === 'fourth').length

  return {
    wins,
    losses,
    ties,
    winPct: gamesPlayed > 0 ? ((wins + ties * 0.5) / gamesPlayed).toFixed(3) : '.000',
    pointsFor: pf.toFixed(2),
    pointsAgainst: pa.toFixed(2),
    ppg: gamesPlayed > 0 ? (pf / gamesPlayed).toFixed(2) : '0.00',
    playoffAppearances,
    championships,
    playoffRecord: `${playoffWins}-${playoffLosses}`,
  }
}
