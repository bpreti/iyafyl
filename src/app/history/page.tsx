import { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { getTeams, getSeasons, getPlayoffResults, getSeasonAwards, getAllGames, getAllTeamNames, getTeamCurrentName } from '@/lib/queries'
import SeasonSection, { type AllTimeGameRecords } from '@/components/SeasonSection'
import NotableStats from '@/components/NotableStats'
import { NOTABLE_STATS } from '@/lib/notableStats'

export const metadata: Metadata = { title: 'History' }

export default async function HistoryPage() {
  const [teams, seasons, allResults, allAwards, allGames, allTeamNames] = await Promise.all([
    getTeams(),
    getSeasons(),
    getPlayoffResults(),
    getSeasonAwards(),
    getAllGames(),
    getAllTeamNames(),
  ])

  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year)

  // Compute all-time game records from regular season games
  const regGames = allGames.filter(g => !g.is_playoff)
  const allScores = regGames.flatMap(g => [Number(g.home_score), Number(g.away_score)])

  // Compute per-season avg scores to find the all-time best
  const seasonAvgScores = seasons.map(s => {
    const sg = regGames.filter(g => g.season_id === s.id)
    const scores = sg.flatMap(g => [Number(g.home_score), Number(g.away_score)])
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  })

  const allTimeGameRecords: AllTimeGameRecords = {
    highScore:       Math.max(...allScores),
    lowScore:        Math.min(...allScores),
    avgScore:        Math.max(...seasonAvgScores),
    biggestBlowout:  Math.max(...regGames.map(g => Number(g.point_difference))),
    closestGame:     Math.min(...regGames.map(g => Number(g.point_difference))),
    highCombined:    Math.max(...regGames.map(g => Number(g.combined_points))),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">

      <div className="space-y-1 mb-10">
        <h1 className="text-4xl font-extrabold">League History</h1>
        <p style={{ color: 'var(--text-secondary)' }}>A look back at every season of IYAFYL</p>
      </div>

      {sortedSeasons.map(season => {
        const champResult    = allResults.find(pr => pr.season_id === season.id && pr.result === 'champion')
        const runnerUpResult = allResults.find(pr => pr.season_id === season.id && pr.result === 'runner_up')
        const thirdResult    = allResults.find(pr => pr.season_id === season.id && pr.result === 'third')
        const suckoChamp     = allResults.find(pr => pr.season_id === season.id && pr.result === 'sucko_winner')
        const awards         = allAwards.filter(a => a.season_id === season.id)
        const hasData        = champResult || suckoChamp || awards.length > 0

        const seasonGames = allGames.filter(g => g.season_id === season.id)

        return (
          <div key={season.id} className="space-y-3 pb-8">
            {/* Year strip */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--accent-light)' }}>{season.year}</span>
              {champResult && (
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  🏆 {getTeamCurrentName(champResult.team_id, teams)}
                </span>
              )}
            </div>

            <div className="card p-5 sm:p-6 space-y-5">
              {/* Podium */}
              {champResult && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:items-end">
                  {runnerUpResult && (
                    <div className="card-runner-up p-4 space-y-1 order-2 sm:order-1">
                      <p className="text-xs font-semibold" style={{ color: 'var(--silver)' }}>🥈 Runner-Up</p>
                      <p className="font-bold leading-tight">{getTeamCurrentName(runnerUpResult.team_id, teams)}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{teams.find(t => t.id === runnerUpResult.team_id)?.owner_name}</p>
                    </div>
                  )}
                  <div className="card-champion p-5 space-y-1 text-center order-1 sm:order-2 sm:-translate-y-3">
                    <p className="text-xs font-bold" style={{ color: 'var(--gold)' }}>🏆 Champion</p>
                    <p className="font-extrabold text-xl leading-tight">{getTeamCurrentName(champResult.team_id, teams)}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{teams.find(t => t.id === champResult.team_id)?.owner_name}</p>
                  </div>
                  {thirdResult && (
                    <div className="card-third p-4 space-y-1 order-3">
                      <p className="text-xs font-semibold" style={{ color: '#cd7c2a' }}>🥉 3rd Place</p>
                      <p className="font-bold leading-tight">{getTeamCurrentName(thirdResult.team_id, teams)}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{teams.find(t => t.id === thirdResult.team_id)?.owner_name}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Sucko champ */}
              {suckoChamp && (
                <div className="flex items-center gap-3">
                  <span className="badge badge-defunct">💀 Sucko Champ</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {getTeamCurrentName(suckoChamp.team_id, teams)}
                  </span>
                </div>
              )}

              {/* Season awards */}
              {awards.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {awards.map(award => (
                    <div key={award.id} className="rounded-xl p-3 space-y-1" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-light)' }}>
                        {award.label}
                      </p>
                      <p className="font-bold">{award.value}</p>
                      {award.team_id && (
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {getTeamCurrentName(award.team_id, teams)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!hasData && (
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>Season data coming soon.</p>
              )}

              {(() => {
                const notable = NOTABLE_STATS.find(s => s.year === season.year)
                return notable ? <NotableStats stats={notable} /> : null
              })()}

              {seasonGames.length > 0 && (
                <SeasonSection
                  season={season}
                  games={seasonGames}
                  teams={teams}
                  teamNames={allTeamNames}
                  playoffResults={allResults.filter(pr => pr.season_id === season.id)}
                  allTimeRecords={allTimeGameRecords}
                />
              )}
            </div>
          </div>
        )
      })}

      {/* League Constitution */}
      <div className="card p-6 flex items-start gap-4 mt-6">
        <FileText size={24} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
        <div className="space-y-1">
          <h3 className="text-lg font-bold">League Constitution</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            The governing rules and regulations of If You Ain&apos;t First You&apos;re Last.
          </p>
          <Link
            href="/constitution"
            className="mt-2 inline-block text-sm font-medium underline-offset-2 hover:underline"
            style={{ color: 'var(--accent-light)' }}
          >
            View Constitution →
          </Link>
        </div>
      </div>

    </div>
  )
}
