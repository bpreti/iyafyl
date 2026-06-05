import type { Game, Season, TeamWithCurrentName, TeamName, TeamSeasonRow } from '@/types'

// ── Shared helper ─────────────────────────────────────────────────────────────

export function getTeamNameForYear(teamId: number, year: number, teamNames: TeamName[]): string {
  const match = teamNames.find(
    n => n.team_id === teamId && n.start_year <= year && (n.end_year === null || n.end_year >= year)
  )
  return match?.name ?? 'Unknown'
}

// ── Record types ──────────────────────────────────────────────────────────────

export interface RecordEntry {
  rank: number
  label: string      // team name or matchup
  sublabel: string   // owner name or matchup context
  value: string      // formatted stat value
  context: string    // year / week / record context
}

export interface RecordCategory {
  id: string
  title: string
  emoji: string
  variant: 'positive' | 'negative'
  entries: RecordEntry[]
}

// ── Individual team-game scores ───────────────────────────────────────────────

function teamGameScores(
  games: Game[],
  seasons: Season[],
  teams: TeamWithCurrentName[],
  teamNames: TeamName[],
  desc: boolean,
  n: number
): RecordEntry[] {
  const entries: Array<{
    teamName: string; ownerName: string; value: number
    year: number; week: number; oppName: string
  }> = []

  for (const g of games.filter(g => !g.is_playoff)) {
    const year = seasons.find(s => s.id === g.season_id)?.year
    if (!year) continue
    entries.push({
      teamName: getTeamNameForYear(g.home_team_id, year, teamNames),
      ownerName: teams.find(t => t.id === g.home_team_id)?.owner_name ?? '',
      value: Number(g.home_score),
      year, week: g.week,
      oppName: getTeamNameForYear(g.away_team_id, year, teamNames),
    })
    entries.push({
      teamName: getTeamNameForYear(g.away_team_id, year, teamNames),
      ownerName: teams.find(t => t.id === g.away_team_id)?.owner_name ?? '',
      value: Number(g.away_score),
      year, week: g.week,
      oppName: getTeamNameForYear(g.home_team_id, year, teamNames),
    })
  }

  entries.sort((a, b) => desc ? b.value - a.value : a.value - b.value)

  return entries.slice(0, n).map((e, i) => ({
    rank: i + 1,
    label: e.teamName,
    sublabel: e.ownerName,
    value: e.value.toFixed(2),
    context: `${e.year} · Wk ${e.week} · vs ${e.oppName}`,
  }))
}

// ── Game-pair records (combined score, blowout, closest) ─────────────────────

function gamePairRecords(
  games: Game[],
  seasons: Season[],
  teamNames: TeamName[],
  key: 'combined_points' | 'point_difference',
  desc: boolean,
  n: number
): RecordEntry[] {
  const entries = games
    .filter(g => !g.is_playoff)
    .map(g => {
      const year = seasons.find(s => s.id === g.season_id)?.year ?? 0
      const awayScore = Number(g.away_score)
      const homeScore = Number(g.home_score)
      return {
        value: Number(g[key]),
        year,
        week: g.week,
        awayName: getTeamNameForYear(g.away_team_id, year, teamNames),
        homeName: getTeamNameForYear(g.home_team_id, year, teamNames),
        awayScore,
        homeScore,
      }
    })

  entries.sort((a, b) => desc ? b.value - a.value : a.value - b.value)

  return entries.slice(0, n).map((e, i) => ({
    rank: i + 1,
    label: `${e.awayName} vs ${e.homeName}`,
    sublabel: `${e.year} · Week ${e.week}`,
    value: e.value.toFixed(2),
    context: `${e.awayScore.toFixed(2)} — ${e.homeScore.toFixed(2)}`,
  }))
}

// ── Per-season totals ─────────────────────────────────────────────────────────

function seasonTotals(
  teamSeasons: TeamSeasonRow[],
  teams: TeamWithCurrentName[],
  teamNames: TeamName[],
  key: 'points_for' | 'wins' | 'losses',
  desc: boolean,
  n: number,
  fmt: (v: number) => string
): RecordEntry[] {
  const entries = teamSeasons.map(ts => ({
    teamName: getTeamNameForYear(ts.team_id, ts.season_year, teamNames),
    ownerName: teams.find(t => t.id === ts.team_id)?.owner_name ?? '',
    value: Number(ts[key]),
    year: ts.season_year,
    record: `${ts.wins}–${ts.losses}`,
  }))

  entries.sort((a, b) => desc ? b.value - a.value : a.value - b.value)

  return entries.slice(0, n).map((e, i) => ({
    rank: i + 1,
    label: e.teamName,
    sublabel: e.ownerName,
    value: fmt(e.value),
    context: `${e.year} Season · ${e.record}`,
  }))
}

// ── All-time aggregates ───────────────────────────────────────────────────────

function allTimeAggregates(
  teamSeasons: TeamSeasonRow[],
  teams: TeamWithCurrentName[],
  key: 'wins' | 'losses',
  n: number
): RecordEntry[] {
  const map = new Map<number, { wins: number; losses: number; seasons: number }>()

  for (const ts of teamSeasons) {
    const cur = map.get(ts.team_id) ?? { wins: 0, losses: 0, seasons: 0 }
    map.set(ts.team_id, {
      wins:    cur.wins    + ts.wins,
      losses:  cur.losses  + ts.losses,
      seasons: cur.seasons + 1,
    })
  }

  const entries = [...map.entries()].map(([teamId, data]) => {
    const team = teams.find(t => t.id === teamId)
    return {
      label:    team?.current_name ?? 'Unknown',
      sublabel: team?.owner_name ?? '',
      value:    data[key],
      seasons:  data.seasons,
    }
  })

  entries.sort((a, b) => b.value - a.value)

  return entries.slice(0, n).map((e, i) => ({
    rank: i + 1,
    label: e.label,
    sublabel: e.sublabel,
    value: String(e.value),
    context: `${e.seasons} season${e.seasons !== 1 ? 's' : ''}`,
  }))
}

// ── Streak records ────────────────────────────────────────────────────────────

function streakRecords(
  games: Game[],
  seasons: Season[],
  teams: TeamWithCurrentName[],
  teamNames: TeamName[],
  type: 'win' | 'loss',
  n: number
): RecordEntry[] {
  const records: Array<{ teamName: string; ownerName: string; streak: number; year: number }> = []

  for (const season of seasons) {
    const regGames = games.filter(g => g.season_id === season.id && !g.is_playoff)
    const teamIds = [...new Set(regGames.flatMap(g => [g.home_team_id, g.away_team_id]))]

    for (const teamId of teamIds) {
      const teamGames = regGames
        .filter(g => g.home_team_id === teamId || g.away_team_id === teamId)
        .sort((a, b) => a.week - b.week)

      let maxStreak = 0
      let curStreak = 0

      for (const g of teamGames) {
        const myScore  = g.home_team_id === teamId ? Number(g.home_score) : Number(g.away_score)
        const oppScore = g.home_team_id === teamId ? Number(g.away_score) : Number(g.home_score)
        const won = myScore > oppScore

        const matches = type === 'win' ? won : !won
        if (matches) {
          curStreak++
          if (curStreak > maxStreak) maxStreak = curStreak
        } else {
          curStreak = 0
        }
      }

      if (maxStreak > 0) {
        records.push({
          teamName: getTeamNameForYear(teamId, season.year, teamNames),
          ownerName: teams.find(t => t.id === teamId)?.owner_name ?? '',
          streak: maxStreak,
          year: season.year,
        })
      }
    }
  }

  records.sort((a, b) => b.streak - a.streak)

  return records.slice(0, n).map((e, i) => ({
    rank: i + 1,
    label: e.teamName,
    sublabel: e.ownerName,
    value: `${e.streak} games`,
    context: `${e.year} Season`,
  }))
}

// ── Playoff helpers ───────────────────────────────────────────────────────────

function playoffRoundLabel(round: string, totalRounds: number): string {
  if (totalRounds <= 2) return round === 'round_1' ? 'Semifinals' : 'Championship'
  if (round === 'round_1') return 'First Round'
  if (round === 'round_2') return 'Semifinals'
  return 'Championship'
}

function playoffWinsLosses(
  games: Game[],
  teams: TeamWithCurrentName[],
  key: 'wins' | 'losses',
  n: number
): RecordEntry[] {
  const map = new Map<number, { wins: number; losses: number }>()
  for (const g of games.filter(g => g.is_playoff)) {
    const homeWon = Number(g.home_score) > Number(g.away_score)
    const hd = map.get(g.home_team_id) ?? { wins: 0, losses: 0 }
    map.set(g.home_team_id, { wins: hd.wins + (homeWon ? 1 : 0), losses: hd.losses + (homeWon ? 0 : 1) })
    const ad = map.get(g.away_team_id) ?? { wins: 0, losses: 0 }
    map.set(g.away_team_id, { wins: ad.wins + (homeWon ? 0 : 1), losses: ad.losses + (homeWon ? 1 : 0) })
  }
  return [...map.entries()]
    .map(([teamId, d]) => {
      const team = teams.find(t => t.id === teamId)
      return { label: team?.current_name ?? 'Unknown', sublabel: team?.owner_name ?? '', value: d[key], gp: d.wins + d.losses }
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, n)
    .map((e, i) => ({ rank: i + 1, label: e.label, sublabel: e.sublabel, value: String(e.value), context: `${e.gp} playoff game${e.gp !== 1 ? 's' : ''}` }))
}

function playoffResultCount(
  playoffResults: PlayoffResultRow[],
  teams: TeamWithCurrentName[],
  filterFn: (pr: PlayoffResultRow) => boolean,
  contextFn: (teamId: number) => string,
  n: number
): RecordEntry[] {
  const map = new Map<number, number>()
  for (const pr of playoffResults.filter(filterFn)) {
    map.set(pr.team_id, (map.get(pr.team_id) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([teamId, count]) => {
      const team = teams.find(t => t.id === teamId)
      return { label: team?.current_name ?? 'Unknown', sublabel: team?.owner_name ?? '', value: count, context: contextFn(teamId) }
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, n)
    .map((e, i) => ({ rank: i + 1, label: e.label, sublabel: e.sublabel, value: String(e.value), context: e.context }))
}

function playoffGameScores(
  games: Game[],
  seasons: Season[],
  teams: TeamWithCurrentName[],
  teamNames: TeamName[],
  desc: boolean,
  n: number
): RecordEntry[] {
  // Precompute total rounds per season for correct round labels
  const roundsPerSeason = new Map<number, Set<string>>()
  for (const g of games.filter(g => g.is_playoff)) {
    if (!roundsPerSeason.has(g.season_id)) roundsPerSeason.set(g.season_id, new Set())
    roundsPerSeason.get(g.season_id)!.add(g.playoff_round ?? '')
  }

  const entries: Array<{ teamName: string; ownerName: string; value: number; year: number; round: string; opp: string }> = []
  for (const g of games.filter(g => g.is_playoff)) {
    const season = seasons.find(s => s.id === g.season_id)
    if (!season) continue
    const totalRounds = roundsPerSeason.get(g.season_id)?.size ?? 1
    const round = playoffRoundLabel(g.playoff_round ?? '', totalRounds)
    entries.push({
      teamName: getTeamNameForYear(g.home_team_id, season.year, teamNames),
      ownerName: teams.find(t => t.id === g.home_team_id)?.owner_name ?? '',
      value: Number(g.home_score), year: season.year, round,
      opp: getTeamNameForYear(g.away_team_id, season.year, teamNames),
    })
    entries.push({
      teamName: getTeamNameForYear(g.away_team_id, season.year, teamNames),
      ownerName: teams.find(t => t.id === g.away_team_id)?.owner_name ?? '',
      value: Number(g.away_score), year: season.year, round,
      opp: getTeamNameForYear(g.home_team_id, season.year, teamNames),
    })
  }
  entries.sort((a, b) => desc ? b.value - a.value : a.value - b.value)
  return entries.slice(0, n).map((e, i) => ({
    rank: i + 1, label: e.teamName, sublabel: e.ownerName,
    value: e.value.toFixed(2),
    context: `${e.year} ${e.round} · vs ${e.opp}`,
  }))
}

const BEST_PLAYER_PERFORMANCES: RecordEntry[] = [
  { rank: 1, label: 'Alvin Kamara',   sublabel: 'Brent',   value: '53.20', context: '2020 Finals' },
  { rank: 2, label: "Ja'Marr Chase",  sublabel: 'Taylor',  value: '44.60', context: '2021 Finals' },
  { rank: 3, label: 'Josh Allen',     sublabel: 'George',  value: '41.28', context: '2024 Consolation 1st Rd.' },
  { rank: 4, label: 'Amari Cooper',   sublabel: 'Brianna', value: '40.50', context: '2023 Consolation 2nd Rd.' },
  { rank: 5, label: 'Saquon Barkley', sublabel: 'Jess',    value: '39.90', context: '2019 3rd Place' },
]

export function computePlayoffRecords(
  games: Game[],
  seasons: Season[],
  teams: TeamWithCurrentName[],
  teamNames: TeamName[],
  playoffResults: PlayoffResultRow[],
  n = 5
): RecordCategory[] {
  const winnerResults = playoffResults.filter(pr => pr.bracket === 'winners')
  const suckoResults  = playoffResults.filter(pr => pr.bracket === 'sucko')

  const playoffSeasonCount = (teamId: number) => {
    const c = winnerResults.filter(pr => pr.team_id === teamId).length
    return `${c} playoff season${c !== 1 ? 's' : ''}`
  }
  const suckoSeasonCount = (teamId: number) => {
    const c = suckoResults.filter(pr => pr.team_id === teamId).length
    return `${c} sucko season${c !== 1 ? 's' : ''}`
  }

  return [
    {
      id: 'playoff-wins',
      title: 'Most Wins All Time',
      emoji: '🏆',
      variant: 'positive',
      entries: playoffWinsLosses(games, teams, 'wins', n),
    },
    {
      id: 'playoff-losses',
      title: 'Most Losses All Time',
      emoji: '💔',
      variant: 'negative',
      entries: playoffWinsLosses(games, teams, 'losses', n),
    },
    {
      id: 'champ-appearances',
      title: 'Most Championship Game Appearances',
      emoji: '🎯',
      variant: 'positive',
      entries: playoffResultCount(
        playoffResults, teams,
        pr => pr.bracket === 'winners' && (pr.result === 'champion' || pr.result === 'runner_up'),
        playoffSeasonCount, n
      ),
    },
    {
      id: 'sucko-appearances',
      title: 'Most Sucko Bowl Championship Appearances',
      emoji: '💀',
      variant: 'negative',
      entries: playoffResultCount(
        playoffResults, teams,
        pr => pr.bracket === 'sucko' && (pr.result === 'sucko_winner' || pr.result === 'sucko_runner_up'),
        suckoSeasonCount, n
      ),
    },
    {
      id: 'championships',
      title: 'Most Championships',
      emoji: '👑',
      variant: 'positive',
      entries: playoffResultCount(
        playoffResults, teams,
        pr => pr.result === 'champion',
        playoffSeasonCount, n
      ),
    },
    {
      id: 'sucko-titles',
      title: 'Most Sucko Bowl Championships',
      emoji: '☠️',
      variant: 'negative',
      entries: playoffResultCount(
        playoffResults, teams,
        pr => pr.result === 'sucko_winner',
        suckoSeasonCount, n
      ),
    },
    {
      id: 'playoff-high-score',
      title: 'Most Points in a Single Game',
      emoji: '🔥',
      variant: 'positive',
      entries: playoffGameScores(games, seasons, teams, teamNames, true, n),
    },
    {
      id: 'playoff-low-score',
      title: 'Fewest Points in a Single Game',
      emoji: '🥶',
      variant: 'negative',
      entries: playoffGameScores(games, seasons, teams, teamNames, false, n),
    },
    {
      id: 'best-player',
      title: 'Best Individual Player Performance',
      emoji: '⭐',
      variant: 'positive',
      entries: BEST_PLAYER_PERFORMANCES,
    },
    {
      id: 'playoff-appearances',
      title: 'Most Playoff Appearances',
      emoji: '🎖️',
      variant: 'positive',
      entries: playoffResultCount(
        playoffResults, teams,
        pr => pr.bracket === 'winners',
        playoffSeasonCount, n
      ),
    },
  ]
}

// ── Main export ───────────────────────────────────────────────────────────────

export function computeRegularSeasonRecords(
  games: Game[],
  seasons: Season[],
  teams: TeamWithCurrentName[],
  teamNames: TeamName[],
  teamSeasons: TeamSeasonRow[],
  n = 5
): RecordCategory[] {
  return [
    {
      id: 'most-pts-season',
      title: 'Most Points in a Single Season',
      emoji: '🔥',
      variant: 'positive',
      entries: seasonTotals(teamSeasons, teams, teamNames, 'points_for', true, n, v => v.toFixed(2)),
    },
    {
      id: 'least-pts-season',
      title: 'Least Points in a Single Season',
      emoji: '📉',
      variant: 'negative',
      entries: seasonTotals(teamSeasons, teams, teamNames, 'points_for', false, n, v => v.toFixed(2)),
    },
    {
      id: 'most-pts-game',
      title: 'Most Points in a Single Game',
      emoji: '💥',
      variant: 'positive',
      entries: teamGameScores(games, seasons, teams, teamNames, true, n),
    },
    {
      id: 'fewest-pts-game',
      title: 'Fewest Points in a Single Game',
      emoji: '😬',
      variant: 'negative',
      entries: teamGameScores(games, seasons, teams, teamNames, false, n),
    },
    {
      id: 'highest-combined',
      title: 'Highest Scoring Game',
      emoji: '🚀',
      variant: 'positive',
      entries: gamePairRecords(games, seasons, teamNames, 'combined_points', true, n),
    },
    {
      id: 'lowest-combined',
      title: 'Lowest Scoring Game',
      emoji: '🥶',
      variant: 'negative',
      entries: gamePairRecords(games, seasons, teamNames, 'combined_points', false, n),
    },
    {
      id: 'biggest-blowout',
      title: 'Biggest Blowouts',
      emoji: '💣',
      variant: 'positive',
      entries: gamePairRecords(games, seasons, teamNames, 'point_difference', true, n),
    },
    {
      id: 'closest-game',
      title: 'Closest Games',
      emoji: '😤',
      variant: 'positive',
      entries: gamePairRecords(games, seasons, teamNames, 'point_difference', false, n),
    },
    {
      id: 'most-wins-season',
      title: 'Most Wins in a Single Season',
      emoji: '🏅',
      variant: 'positive',
      entries: seasonTotals(teamSeasons, teams, teamNames, 'wins', true, n, v => `${v}`),
    },
    {
      id: 'most-losses-season',
      title: 'Most Losses in a Single Season',
      emoji: '😔',
      variant: 'negative',
      entries: seasonTotals(teamSeasons, teams, teamNames, 'losses', true, n, v => `${v}`),
    },
    {
      id: 'win-streak',
      title: 'Longest Winning Streak',
      emoji: '⚡',
      variant: 'positive',
      entries: streakRecords(games, seasons, teams, teamNames, 'win', n),
    },
    {
      id: 'loss-streak',
      title: 'Longest Losing Streak',
      emoji: '💀',
      variant: 'negative',
      entries: streakRecords(games, seasons, teams, teamNames, 'loss', n),
    },
    {
      id: 'most-wins-alltime',
      title: 'Most Wins All Time',
      emoji: '👑',
      variant: 'positive',
      entries: allTimeAggregates(teamSeasons, teams, 'wins', n),
    },
    {
      id: 'most-losses-alltime',
      title: 'Most Losses All Time',
      emoji: '🪦',
      variant: 'negative',
      entries: allTimeAggregates(teamSeasons, teams, 'losses', n),
    },
  ]
}
