import { Metadata } from 'next'
import { getTeams, getSeasons, getPlayoffResults, getTeamCurrentName } from '@/lib/queries'
import { getTeamColor } from '@/lib/teamColors'
import type { PlayoffResultType } from '@/types'

export const metadata: Metadata = { title: 'Playoff Stats' }

const WINNERS_ORDER: PlayoffResultType[] = ['champion', 'runner_up', 'third', 'fourth', 'fifth', 'sixth']
const SUCKO_ORDER:   PlayoffResultType[] = ['sucko_exit', 'sucko_runner_up', 'sucko_winner']

const RESULT_LABEL: Record<PlayoffResultType, string> = {
  champion:         '🏆 Champion',
  runner_up:        '🥈 Runner-Up',
  third:            '🥉 3rd Place',
  fourth:           '4th Place',
  fifth:            '5th Place',
  sixth:            '6th Place',
  first_round_exit: 'First Round Exit',
  sucko_winner:     '💀 Sucko Champ',
  sucko_runner_up:  'Sucko Runner-Up',
  sucko_exit:       'Sucko Bowl',
}

const RESULT_BADGE: Record<PlayoffResultType, string> = {
  champion:         'badge badge-champion',
  runner_up:        'badge badge-runner-up',
  third:            'badge badge-third',
  fourth:           'badge',
  fifth:            'badge',
  sixth:            'badge',
  first_round_exit: 'badge',
  sucko_winner:     'badge badge-defunct',
  sucko_runner_up:  'badge',
  sucko_exit:       'badge',
}

function getInitials(name: string) {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default async function PlayoffStatsPage() {
  const [teams, seasons, allResults] = await Promise.all([
    getTeams(),
    getSeasons(),
    getPlayoffResults(),
  ])

  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year)

  const playoffAllTime = teams.map(team => {
    const results = allResults.filter(pr => pr.team_id === team.id && pr.bracket === 'winners')
    const champs  = results.filter(r => r.result === 'champion').length
    const ru      = results.filter(r => r.result === 'runner_up').length
    const thirds  = results.filter(r => r.result === 'third').length
    const apps    = results.length
    return { team, apps, champs, ru, thirds }
  }).filter(r => r.apps > 0).sort((a, b) => b.champs - a.champs || b.apps - a.apps)

  const suckoAllTime = teams.map(team => {
    const results = allResults.filter(pr => pr.team_id === team.id && pr.bracket === 'sucko')
    const wins    = results.filter(r => r.result === 'sucko_winner').length
    const apps    = results.length
    return { team, apps, wins }
  }).filter(r => r.apps > 0).sort((a, b) => b.wins - a.wins || b.apps - a.apps)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold">Playoffs</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Winners bracket · Sucko Bowl · all-time records</p>
      </div>

      {/* All-time playoff records */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">All-Time Playoff Appearances</h2>
        <div className="space-y-2">
          {playoffAllTime.map((row, i) => {
            const color = getTeamColor(row.team.id)
            return (
              <div key={row.team.id} className="card flex items-center gap-3 px-4 py-3">
                <span className="text-sm font-bold w-6 text-center flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                  #{i + 1}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: color.bg, color: color.text }}
                >
                  {getInitials(row.team.owner_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight truncate">{row.team.current_name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {row.team.owner_name} · {row.apps} appearance{row.apps !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {row.champs > 0 && (
                    <span className="badge badge-champion">🏆 {row.champs}</span>
                  )}
                  {row.ru > 0 && (
                    <span className="badge badge-runner-up hidden sm:inline-flex">🥈 {row.ru}</span>
                  )}
                  {row.thirds > 0 && (
                    <span className="badge badge-third hidden sm:inline-flex">🥉 {row.thirds}</span>
                  )}
                  {row.champs === 0 && row.ru === 0 && row.thirds === 0 && (
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>—</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Sucko Bowl records */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">💀 Sucko Bowl Records</h2>
        <div className="space-y-2">
          {suckoAllTime.map((row, i) => {
            const color = getTeamColor(row.team.id)
            return (
              <div key={row.team.id} className="card flex items-center gap-3 px-4 py-3">
                <span className="text-sm font-bold w-6 text-center flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                  #{i + 1}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: color.bg, color: color.text }}
                >
                  {getInitials(row.team.owner_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight truncate">{row.team.current_name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {row.team.owner_name} · {row.apps} appearance{row.apps !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {row.wins > 0
                    ? <span className="badge badge-defunct">💀 {row.wins}</span>
                    : <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>No titles</span>}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Season-by-season results */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold">Season Results</h2>
        {sortedSeasons.map(season => {
          const winners = allResults
            .filter(pr => pr.season_id === season.id && pr.bracket === 'winners')
            .sort((a, b) => WINNERS_ORDER.indexOf(a.result) - WINNERS_ORDER.indexOf(b.result))
          const sucko = allResults
            .filter(pr => pr.season_id === season.id && pr.bracket === 'sucko')
            .sort((a, b) => SUCKO_ORDER.indexOf(a.result) - SUCKO_ORDER.indexOf(b.result))

          if (winners.length === 0 && sucko.length === 0) return null

          return (
            <div key={season.id} className="space-y-3">
              <h3 className="text-lg font-bold" style={{ color: 'var(--accent-light)' }}>{season.year}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {winners.length > 0 && (
                  <div className="card overflow-hidden">
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--surface-2)', color: 'var(--accent-light)' }}>
                      Playoffs
                    </div>
                    <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                      {winners.map(pr => {
                        const team = teams.find(t => t.id === pr.team_id)
                        return (
                          <div key={pr.id} className="px-4 py-2.5 flex items-center gap-3">
                            <span className={RESULT_BADGE[pr.result] ?? 'badge'}>{RESULT_LABEL[pr.result] ?? pr.result}</span>
                            <span className="font-semibold text-sm flex-1">{getTeamCurrentName(pr.team_id, teams)}</span>
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{team?.owner_name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {sucko.length > 0 && (
                  <div className="card overflow-hidden">
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--surface-2)', color: 'var(--text-secondary)' }}>
                      Sucko Bowl
                    </div>
                    <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                      {sucko.map(pr => {
                        const team = teams.find(t => t.id === pr.team_id)
                        return (
                          <div key={pr.id} className="px-4 py-2.5 flex items-center gap-3">
                            <span className={RESULT_BADGE[pr.result] ?? 'badge'}>{RESULT_LABEL[pr.result] ?? pr.result}</span>
                            <span className="font-semibold text-sm flex-1">{getTeamCurrentName(pr.team_id, teams)}</span>
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{team?.owner_name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </section>

    </div>
  )
}
