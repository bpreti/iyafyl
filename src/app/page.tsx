import Link from 'next/link'
import {
  getTeams, getSeasons, getPlayoffResults, getSeasonAwards, getTeamCurrentName,
} from '@/lib/queries'

export default async function HomePage() {
  const [teams, seasons, allPlayoffResults, allAwards] = await Promise.all([
    getTeams(),
    getSeasons(),
    getPlayoffResults(),
    getSeasonAwards(),
  ])

  const latestSeason = seasons.reduce((max, s) => s.year > max.year ? s : max, seasons[0])
  const latestSeasonId = latestSeason?.id
  const latestYear = latestSeason?.year

  const latestResults = allPlayoffResults.filter(pr => pr.season_id === latestSeasonId)
  const awards = allAwards.filter(a => a.season_id === latestSeasonId)

  const champion = latestResults.find(r => r.result === 'champion')
  const runnerUp = latestResults.find(r => r.result === 'runner_up')
  const third    = latestResults.find(r => r.result === 'third')

  const championTeam = champion ? teams.find(t => t.id === champion.team_id) : null
  const runnerUpTeam = runnerUp ? teams.find(t => t.id === runnerUp.team_id) : null
  const thirdTeam    = third    ? teams.find(t => t.id === third.team_id)    : null

  return (
    <div>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center space-y-5">
        <p className="text-5xl">🏆</p>
        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--text-secondary)' }}>
          Friends &amp; Family Fantasy Football · Est. 2019
        </p>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05]">
          If You Ain&apos;t First<br />
          <span className="gradient-text">You&apos;re Last</span>
        </h1>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          {seasons.length} seasons played · {teams.length} all-time competitors · {teams.filter(t => t.is_active).length} still fighting
        </p>
        <div className="flex justify-center gap-3 flex-wrap pt-1">
          <Link href="/teams" className="btn-primary">Meet the Teams</Link>
          <Link href="/history" className="btn-outline">League History</Link>
        </div>
      </section>

      {/* Season recap */}
      {champion && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{latestYear} Season</h2>
            <Link href="/history" className="text-sm font-medium" style={{ color: 'var(--accent-light)' }}>
              Full history →
            </Link>
          </div>

          {/* Podium */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:items-end">
            {runnerUpTeam && (
              <Link href={`/teams/${runnerUpTeam.slug}`} className="card-runner-up p-5 space-y-2 block order-2 sm:order-1">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--silver)' }}>🥈 Runner-Up</p>
                <p className="font-bold text-lg leading-tight">{runnerUpTeam.current_name}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{runnerUpTeam.owner_name}</p>
              </Link>
            )}
            {championTeam && (
              <Link href={`/teams/${championTeam.slug}`} className="card-champion px-5 pt-10 pb-6 space-y-2 block text-center order-1 sm:order-2 sm:-translate-y-4">
                <p className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--gold)' }}>🏆 {latestYear} Champion</p>
                <p className="font-extrabold text-2xl leading-tight">{championTeam.current_name}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{championTeam.owner_name}</p>
              </Link>
            )}
            {thirdTeam && (
              <Link href={`/teams/${thirdTeam.slug}`} className="card-third p-5 space-y-2 block order-3">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#cd7c2a' }}>🥉 3rd Place</p>
                <p className="font-bold text-lg leading-tight">{thirdTeam.current_name}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{thirdTeam.owner_name}</p>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Season highlights */}
      {awards.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-5">
          <h2 className="text-2xl font-bold">{latestYear} Highlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {awards.map(award => {
              const teamName = award.team_id ? getTeamCurrentName(award.team_id, teams) : null
              return (
                <div key={award.id} className="card p-5 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>
                    {award.label}
                  </p>
                  <p className="text-2xl font-extrabold">{award.value}</p>
                  {teamName && (
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{teamName}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Offseason notes */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold">📋 Offseason Notes</h2>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {[
              'Champion determining 2026 draft order methodology',
              'Trophy nameplates being shipped to winners',
              'Commissioner outreach planned for summer participation confirmation',
              'Late summer kickoff meeting and rules updates scheduled',
            ].map(note => (
              <li key={note} className="flex items-start gap-2">
                <span style={{ color: 'var(--accent-light)' }} className="mt-0.5 flex-shrink-0">→</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
