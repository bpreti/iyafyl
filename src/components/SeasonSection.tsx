'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, BarChart2, Calendar } from 'lucide-react'
import type { Game, Season, TeamWithCurrentName, TeamName, PlayoffResultRow } from '@/types'
import { getTeamNameForYear } from '@/lib/records'

function getOwnerName(teamId: number, teams: TeamWithCurrentName[]): string {
  return teams.find(t => t.id === teamId)?.owner_name ?? ''
}

function fmtScore(score: string): string {
  return Number(score).toFixed(2)
}

function playoffRoundLabel(round: string, totalRounds: number): string {
  if (totalRounds === 1) return 'Playoffs'
  if (totalRounds === 2) return round === 'round_1' ? 'Semifinals' : 'Championship'
  if (round === 'round_1') return 'First Round'
  if (round === 'round_2') return 'Semifinals'
  return 'Championship'
}

// ── Season Stats ─────────────────────────────────────────────────────────────

function SeasonStats({
  games,
  year,
  teams,
  teamNames,
}: {
  games: Game[]
  year: number
  teams: TeamWithCurrentName[]
  teamNames: TeamName[]
}) {
  const regularGames = games.filter(g => !g.is_playoff)

  if (regularGames.length === 0) return null

  // Flatten all individual scores to find extremes
  type ScoreEntry = { score: number; teamId: number; opponentId: number; gameId: number }
  const allScores: ScoreEntry[] = []
  regularGames.forEach(g => {
    allScores.push({ score: Number(g.home_score), teamId: g.home_team_id, opponentId: g.away_team_id, gameId: g.id })
    allScores.push({ score: Number(g.away_score), teamId: g.away_team_id, opponentId: g.home_team_id, gameId: g.id })
  })

  const highScore = allScores.reduce((best, s) => (s.score > best.score ? s : best), allScores[0])
  const lowScore  = allScores.reduce((best, s) => (s.score < best.score ? s : best), allScores[0])

  const allRegDiffs = regularGames.map(g => ({ diff: Number(g.point_difference), game: g }))
  const closestGame  = allRegDiffs.reduce((best, x) => (x.diff < best.diff ? x : best), allRegDiffs[0])
  const biggestBlowout = allRegDiffs.reduce((best, x) => (x.diff > best.diff ? x : best), allRegDiffs[0])

  const highestCombined = regularGames.reduce(
    (best, g) => (Number(g.combined_points) > Number(best.combined_points) ? g : best),
    regularGames[0]
  )

  const totalScored = allScores.reduce((sum, s) => sum + s.score, 0)
  const avgScore = (totalScored / allScores.length).toFixed(2)

  const stat = (label: string, value: string, sub: string) => (
    <div className="rounded-xl p-4 space-y-1" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{label}</p>
      <p className="text-xl font-bold" style={{ color: 'var(--accent-light)' }}>{value}</p>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
    </div>
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BarChart2 size={16} style={{ color: 'var(--accent-light)' }} />
        <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Season Stats</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stat('High Score', fmtScore(String(highScore.score)), getTeamNameForYear(highScore.teamId, year, teamNames))}
        {stat('Low Score',  fmtScore(String(lowScore.score)),  getTeamNameForYear(lowScore.teamId, year, teamNames))}
        {stat('Avg Score',  avgScore, 'per team per game')}
        {stat('Closest Game', fmtScore(closestGame.diff.toString()),
          `${getTeamNameForYear(closestGame.game.home_team_id, year, teamNames)} vs ${getTeamNameForYear(closestGame.game.away_team_id, year, teamNames)}`)}
        {stat('Biggest Blowout', fmtScore(biggestBlowout.diff.toString()),
          `${getTeamNameForYear(biggestBlowout.game.home_team_id, year, teamNames)} vs ${getTeamNameForYear(biggestBlowout.game.away_team_id, year, teamNames)}`)}
        {stat('High Combined', fmtScore(highestCombined.combined_points),
          `${getTeamNameForYear(highestCombined.home_team_id, year, teamNames)} vs ${getTeamNameForYear(highestCombined.away_team_id, year, teamNames)}`)}
      </div>
    </div>
  )
}

// ── Position label helpers ────────────────────────────────────────────────────

import type { PlayoffResultType } from '@/types'

const WINNERS_POSITION: Partial<Record<PlayoffResultType, string>> = {
  champion:  '🏆 Championship',
  runner_up: '🏆 Championship',
  third:     '🥉 3rd Place',
  fourth:    '🥉 3rd Place',
  fifth:     '5th Place',
  sixth:     '5th Place',
}

const SUCKO_POSITION: Partial<Record<PlayoffResultType, string>> = {
  sucko_winner:    '💀 Sucko Championship',
  sucko_runner_up: '💀 Sucko Championship',
}

function getPositionLabel(
  game: Game,
  playoffResults: PlayoffResultRow[],
  bracket: 'winners' | 'sucko'
): string | null {
  const lookup = bracket === 'winners' ? WINNERS_POSITION : SUCKO_POSITION
  const homeResult = playoffResults.find(pr => pr.team_id === game.home_team_id && pr.bracket === bracket)?.result
  const awayResult = playoffResults.find(pr => pr.team_id === game.away_team_id && pr.bracket === bracket)?.result
  if (!homeResult || !awayResult) return null
  return lookup[homeResult] ?? null
}

// ── Game Row ─────────────────────────────────────────────────────────────────

function GameRow({
  game,
  year,
  teams,
  teamNames,
  positionLabel,
}: {
  game: Game
  year: number
  teams: TeamWithCurrentName[]
  teamNames: TeamName[]
  positionLabel?: string | null
}) {
  const homeScore = Number(game.home_score)
  const awayScore = Number(game.away_score)
  const homeWon = homeScore > awayScore

  const homeName = getTeamNameForYear(game.home_team_id, year, teamNames)
  const awayName = getTeamNameForYear(game.away_team_id, year, teamNames)

  const winnerStyle = { color: 'var(--text-primary)', fontWeight: 700 }
  const loserStyle  = { color: 'var(--text-secondary)' }

  return (
    <div className="flex items-center gap-2 py-2 px-3 text-sm" style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Position label */}
      {positionLabel !== undefined && (
        <span
          className="shrink-0 text-xs font-semibold w-36 hidden sm:block"
          style={{ color: 'var(--text-secondary)' }}
        >
          {positionLabel ?? ''}
        </span>
      )}
      {/* Away team */}
      <span className="flex-1 min-w-0 truncate text-right" style={homeWon ? loserStyle : winnerStyle}>
        {awayName}
      </span>
      {/* Scores */}
      <span className="tabular-nums font-bold shrink-0 w-12 text-right" style={homeWon ? loserStyle : winnerStyle}>
        {fmtScore(game.away_score)}
      </span>
      <span className="shrink-0 text-xs" style={{ color: 'var(--border)' }}>—</span>
      <span className="tabular-nums font-bold shrink-0 w-12 text-left" style={homeWon ? winnerStyle : loserStyle}>
        {fmtScore(game.home_score)}
      </span>
      {/* Home team */}
      <span className="flex-1 min-w-0 truncate" style={homeWon ? winnerStyle : loserStyle}>
        {homeName}
      </span>
    </div>
  )
}

// ── Week Block ────────────────────────────────────────────────────────────────

const blockStyles = {
  regular: {
    header: { background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' },
    label:  { color: 'var(--text-secondary)' },
    emoji:  null,
  },
  winners: {
    header: { background: 'rgba(234,179,8,0.1)', borderBottom: '1px solid rgba(234,179,8,0.25)' },
    label:  { color: 'var(--gold)' },
    emoji:  '🏆',
  },
  sucko: {
    header: { background: 'rgba(220,38,38,0.06)', borderBottom: '1px solid rgba(220,38,38,0.15)' },
    label:  { color: '#dc2626' },
    emoji:  '💀',
  },
}

function WeekBlock({
  label,
  games,
  year,
  teams,
  teamNames,
  variant = 'regular',
  playoffResults,
}: {
  label: string
  games: Game[]
  year: number
  teams: TeamWithCurrentName[]
  teamNames: TeamName[]
  variant?: 'regular' | 'winners' | 'sucko'
  playoffResults?: PlayoffResultRow[]
}) {
  const s = blockStyles[variant]
  const bracket = variant === 'sucko' ? 'sucko' : 'winners'
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div className="px-3 py-2 flex items-center gap-2" style={s.header}>
        {s.emoji && <span className="text-xs">{s.emoji}</span>}
        <span className="text-xs font-bold uppercase tracking-wider" style={s.label}>
          {label}
        </span>
        <span className="text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>{games.length} game{games.length !== 1 ? 's' : ''}</span>
      </div>
      <div>
        {games.map(g => (
          <GameRow
            key={g.id}
            game={g}
            year={year}
            teams={teams}
            teamNames={teamNames}
            positionLabel={playoffResults ? getPositionLabel(g, playoffResults, bracket) : undefined}
          />
        ))}
      </div>
    </div>
  )
}

// ── SeasonSection ─────────────────────────────────────────────────────────────

interface SeasonSectionProps {
  season: Season
  games: Game[]
  teams: TeamWithCurrentName[]
  teamNames: TeamName[]
  playoffResults: PlayoffResultRow[]
}

export default function SeasonSection({ season, games, teams, teamNames, playoffResults }: SeasonSectionProps) {
  const [selectedTeams, setSelectedTeams] = useState<number[]>([])
  const [showSchedule, setShowSchedule] = useState(false)

  const seasonTeamIds = useMemo(() => {
    const ids = new Set<number>()
    games.forEach(g => { ids.add(g.home_team_id); ids.add(g.away_team_id) })
    return [...ids].sort((a, b) =>
      getTeamNameForYear(a, season.year, teamNames).localeCompare(
        getTeamNameForYear(b, season.year, teamNames)
      )
    )
  }, [games, season.year, teamNames])

  const filteredGames = useMemo(
    () =>
      selectedTeams.length === 0
        ? games
        : games.filter(g => selectedTeams.includes(g.home_team_id) || selectedTeams.includes(g.away_team_id)),
    [games, selectedTeams]
  )

  // Group regular season by week
  const weekMap = useMemo(() => {
    const map = new Map<number, Game[]>()
    filteredGames.filter(g => !g.is_playoff).forEach(g => {
      if (!map.has(g.week)) map.set(g.week, [])
      map.get(g.week)!.push(g)
    })
    return map
  }, [filteredGames])

  // Group playoff games by bracket + round
  const { winnersRoundMap, suckoRoundMap } = useMemo(() => {
    const winners = new Map<string, Game[]>()
    const sucko   = new Map<string, Game[]>()
    filteredGames.filter(g => g.is_playoff).forEach(g => {
      const key = g.playoff_round ?? 'unknown'
      const map = g.bracket === 'sucko' ? sucko : winners
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(g)
    })
    return { winnersRoundMap: winners, suckoRoundMap: sucko }
  }, [filteredGames])

  // Total distinct rounds per bracket (from all unfiltered games, for correct labels)
  const totalWinnersRounds = useMemo(() =>
    new Set(games.filter(g => g.is_playoff && g.bracket !== 'sucko').map(g => g.playoff_round)).size
  , [games])
  const totalSuckoRounds = useMemo(() =>
    new Set(games.filter(g => g.is_playoff && g.bracket === 'sucko').map(g => g.playoff_round)).size
  , [games])

  // Final round key per bracket (for showing position labels)
  const winnersFinalRound = useMemo(() => {
    const rounds = games.filter(g => g.is_playoff && g.bracket !== 'sucko').map(g => g.playoff_round ?? '').filter(Boolean)
    return rounds.length ? [...rounds].sort().at(-1)! : null
  }, [games])
  const suckoFinalRound = useMemo(() => {
    const rounds = games.filter(g => g.is_playoff && g.bracket === 'sucko').map(g => g.playoff_round ?? '').filter(Boolean)
    return rounds.length ? [...rounds].sort().at(-1)! : null
  }, [games])

  const toggleTeam = (id: number) =>
    setSelectedTeams(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const clearFilter = () => setSelectedTeams([])

  return (
    <div className="space-y-6 pt-2">
      <SeasonStats games={games} year={season.year} teams={teams} teamNames={teamNames} />

      {/* Schedule toggle */}
      <div>
        <button
          onClick={() => setShowSchedule(s => !s)}
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: 'var(--accent-light)' }}
        >
          <Calendar size={15} />
          {showSchedule ? 'Hide' : 'Show'} Schedule
          {showSchedule ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showSchedule && (
          <div className="mt-4 space-y-4">
            {/* Team filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Filter by Team
                </span>
                {selectedTeams.length > 0 && (
                  <button
                    onClick={clearFilter}
                    className="text-xs underline"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {seasonTeamIds.map(id => {
                  const name  = getTeamNameForYear(id, season.year, teamNames)
                  const owner = getOwnerName(id, teams)
                  const active = selectedTeams.includes(id)
                  return (
                    <button
                      key={id}
                      onClick={() => toggleTeam(id)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={
                        active
                          ? { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' }
                          : { background: 'var(--surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
                      }
                      title={owner}
                    >
                      {name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Game count */}
            {selectedTeams.length > 0 && (
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Showing {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
              </p>
            )}

            {/* Regular season weeks */}
            <div className="space-y-3">
              {[...weekMap.entries()]
                .sort((a, b) => a[0] - b[0])
                .map(([week, wGames]) => (
                  <WeekBlock
                    key={week}
                    label={`Week ${week}`}
                    games={wGames}
                    year={season.year}
                    teams={teams}
                    teamNames={teamNames}
                  />
                ))}
            </div>

            {/* Winners bracket */}
            {winnersRoundMap.size > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--gold)' }}>🏆 Playoffs</p>
                <div className="space-y-3">
                  {[...winnersRoundMap.entries()]
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([round, rGames]) => (
                      <WeekBlock
                        key={round}
                        label={playoffRoundLabel(round, totalWinnersRounds)}
                        games={rGames}
                        year={season.year}
                        teams={teams}
                        teamNames={teamNames}
                        variant="winners"
                        playoffResults={round === winnersFinalRound ? playoffResults : undefined}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Sucko bracket */}
            {suckoRoundMap.size > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#dc2626' }}>💀 Sucko Bowl Tournament</p>
                <div className="space-y-3">
                  {[...suckoRoundMap.entries()]
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([round, rGames]) => (
                      <WeekBlock
                        key={round}
                        label={playoffRoundLabel(round, totalSuckoRounds)}
                        games={rGames}
                        year={season.year}
                        teams={teams}
                        teamNames={teamNames}
                        variant="sucko"
                        playoffResults={round === suckoFinalRound ? playoffResults : undefined}
                      />
                    ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
