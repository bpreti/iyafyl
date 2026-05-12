import { sql } from './db'
import type {
  Team,
  TeamName,
  Season,
  SeasonAward,
  TeamWithCurrentName,
  TeamSeasonRow,
  PlayoffResultRow,
} from '@/types'

// ── Teams ────────────────────────────────────────────────────────────────────

/** All teams, each with their current team name joined in. */
export async function getTeams(): Promise<TeamWithCurrentName[]> {
  const rows = await sql`
    SELECT t.*, tn.name AS current_name
    FROM teams t
    LEFT JOIN team_names tn ON tn.team_id = t.id AND tn.end_year IS NULL
    ORDER BY t.id
  `
  return rows as TeamWithCurrentName[]
}

/** Single team by URL slug, with current name joined. */
export async function getTeamBySlug(slug: string): Promise<TeamWithCurrentName | null> {
  const rows = await sql`
    SELECT t.*, tn.name AS current_name
    FROM teams t
    LEFT JOIN team_names tn ON tn.team_id = t.id AND tn.end_year IS NULL
    WHERE t.slug = ${slug}
  `
  return (rows[0] as TeamWithCurrentName) ?? null
}

// ── Seasons ──────────────────────────────────────────────────────────────────

export async function getSeasons(): Promise<Season[]> {
  const rows = await sql`SELECT * FROM seasons ORDER BY year`
  return rows as Season[]
}

// ── Team Names ───────────────────────────────────────────────────────────────

/** All team name entries for a given team, oldest → newest. */
export async function getTeamNamesForTeam(teamId: number): Promise<TeamName[]> {
  const rows = await sql`
    SELECT * FROM team_names
    WHERE team_id = ${teamId}
    ORDER BY start_year
  `
  return rows as TeamName[]
}

// ── Team Seasons ─────────────────────────────────────────────────────────────

/** All season rows for one team, newest year first, with season_year joined. */
export async function getTeamSeasons(teamId: number): Promise<TeamSeasonRow[]> {
  const rows = await sql`
    SELECT ts.*, s.year AS season_year
    FROM team_seasons ts
    JOIN seasons s ON s.id = ts.season_id
    WHERE ts.team_id = ${teamId}
    ORDER BY s.year DESC
  `
  return rows as TeamSeasonRow[]
}

/** All team-season rows across every team/year, with season_year joined. */
export async function getAllTeamSeasons(): Promise<TeamSeasonRow[]> {
  const rows = await sql`
    SELECT ts.*, s.year AS season_year
    FROM team_seasons ts
    JOIN seasons s ON s.id = ts.season_id
    ORDER BY s.year, ts.final_standing
  `
  return rows as TeamSeasonRow[]
}

/** All team-season rows for one specific season, sorted by standing. */
export async function getTeamSeasonsForSeason(seasonId: number): Promise<TeamSeasonRow[]> {
  const rows = await sql`
    SELECT ts.*, s.year AS season_year
    FROM team_seasons ts
    JOIN seasons s ON s.id = ts.season_id
    WHERE ts.season_id = ${seasonId}
    ORDER BY ts.final_standing
  `
  return rows as TeamSeasonRow[]
}

// ── Playoff Results ──────────────────────────────────────────────────────────

/** Playoff results filtered by season, team, and/or bracket. */
export async function getPlayoffResults(opts?: {
  seasonId?: number
  teamId?: number
  bracket?: 'winners' | 'sucko'
}): Promise<PlayoffResultRow[]> {
  const { seasonId, teamId, bracket } = opts ?? {}

  if (seasonId && teamId) {
    const rows = await sql`
      SELECT pr.*, s.year AS season_year
      FROM playoff_results pr
      JOIN seasons s ON s.id = pr.season_id
      WHERE pr.season_id = ${seasonId} AND pr.team_id = ${teamId}
      ORDER BY s.year DESC
    `
    return rows as PlayoffResultRow[]
  }

  if (teamId) {
    const rows = await sql`
      SELECT pr.*, s.year AS season_year
      FROM playoff_results pr
      JOIN seasons s ON s.id = pr.season_id
      WHERE pr.team_id = ${teamId}
      ORDER BY s.year DESC
    `
    return rows as PlayoffResultRow[]
  }

  if (seasonId && bracket) {
    const rows = await sql`
      SELECT pr.*, s.year AS season_year
      FROM playoff_results pr
      JOIN seasons s ON s.id = pr.season_id
      WHERE pr.season_id = ${seasonId} AND pr.bracket = ${bracket}
      ORDER BY s.year DESC
    `
    return rows as PlayoffResultRow[]
  }

  if (seasonId) {
    const rows = await sql`
      SELECT pr.*, s.year AS season_year
      FROM playoff_results pr
      JOIN seasons s ON s.id = pr.season_id
      WHERE pr.season_id = ${seasonId}
    `
    return rows as PlayoffResultRow[]
  }

  if (bracket) {
    const rows = await sql`
      SELECT pr.*, s.year AS season_year
      FROM playoff_results pr
      JOIN seasons s ON s.id = pr.season_id
      WHERE pr.bracket = ${bracket}
      ORDER BY s.year DESC
    `
    return rows as PlayoffResultRow[]
  }

  const rows = await sql`
    SELECT pr.*, s.year AS season_year
    FROM playoff_results pr
    JOIN seasons s ON s.id = pr.season_id
    ORDER BY s.year DESC
  `
  return rows as PlayoffResultRow[]
}

// ── Season Awards ────────────────────────────────────────────────────────────

export async function getSeasonAwards(seasonId?: number): Promise<SeasonAward[]> {
  if (seasonId) {
    const rows = await sql`
      SELECT * FROM season_awards
      WHERE season_id = ${seasonId}
      ORDER BY id
    `
    return rows as SeasonAward[]
  }
  const rows = await sql`SELECT * FROM season_awards ORDER BY season_id, id`
  return rows as SeasonAward[]
}

// ── Pure JS Helpers ───────────────────────────────────────────────────────────

/** Look up the current display name for a team from a pre-fetched teams array. */
export function getTeamCurrentName(
  teamId: number,
  teams: TeamWithCurrentName[]
): string {
  return teams.find(t => t.id === teamId)?.current_name ?? 'Unknown'
}

/** Derive career stats from pre-fetched data — no extra DB calls. */
export function computeCareerStats(
  teamId: number,
  teamSeasons: TeamSeasonRow[],
  playoffResults: PlayoffResultRow[]
) {
  const ts = teamSeasons.filter(t => t.team_id === teamId)
  const wins   = ts.reduce((s, t) => s + t.wins, 0)
  const losses = ts.reduce((s, t) => s + t.losses, 0)
  const ties   = ts.reduce((s, t) => s + t.ties, 0)
  const pf     = ts.reduce((s, t) => s + Number(t.points_for), 0)
  const pa     = ts.reduce((s, t) => s + Number(t.points_against), 0)
  const gamesPlayed = wins + losses + ties
  const playoffAppearances = ts.filter(t => t.made_playoffs).length

  const pResults = playoffResults.filter(pr => pr.team_id === teamId)
  const championships = pResults.filter(pr => pr.result === 'champion').length

  // Simple playoff W/L based on finish (winners bracket only)
  const winnersBracket = pResults.filter(pr => pr.bracket === 'winners')
  const playoffWins =
    winnersBracket.filter(r => r.result === 'champion').length * 2 +
    winnersBracket.filter(r => r.result === 'runner_up').length * 1 +
    winnersBracket.filter(r => r.result === 'third').length * 1 +
    winnersBracket.filter(r => r.result === 'fifth').length * 1
  const playoffLosses =
    winnersBracket.filter(r =>
      r.result === 'runner_up' || r.result === 'fourth' || r.result === 'sixth'
    ).length

  return {
    wins,
    losses,
    ties,
    winPct:        gamesPlayed > 0 ? ((wins + ties * 0.5) / gamesPlayed).toFixed(3) : '.000',
    pointsFor:     pf.toFixed(2),
    pointsAgainst: pa.toFixed(2),
    ppg:           gamesPlayed > 0 ? (pf / gamesPlayed).toFixed(2) : '0.00',
    playoffAppearances,
    championships,
    playoffRecord: `${playoffWins}-${playoffLosses}`,
  }
}

// ── Convenience: fetch all data needed for career stats in one call ───────────

export async function getTeamDetailData(teamId: number) {
  const [teamSeasons, playoffResults] = await Promise.all([
    getTeamSeasons(teamId),
    getPlayoffResults({ teamId }),
  ])
  return { teamSeasons, playoffResults }
}
