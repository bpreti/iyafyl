import { Metadata } from 'next'
import { Trophy } from 'lucide-react'
import { getTeams, getSeasons, getPlayoffResults, getTeamCurrentName } from '@/lib/queries'
import type { PlayoffResultType } from '@/types'

export const metadata: Metadata = { title: 'Playoff Stats' }

const WINNERS_ORDER: PlayoffResultType[] = ['champion', 'runner_up', 'third', 'fourth', 'fifth', 'sixth']
const SUCKO_ORDER: PlayoffResultType[]   = ['sucko_exit', 'sucko_runner_up', 'sucko_winner']

const RESULT_LABEL: Record<PlayoffResultType, string> = {
  champion:        '🏆 Champion',
  runner_up:       '🥈 Runner-Up',
  third:           '🥉 3rd Place',
  fourth:          '4th Place',
  fifth:           '5th Place',
  sixth:           '6th Place',
  first_round_exit:'First Round Exit',
  sucko_winner:    '💀 Sucko Champ (12th)',
  sucko_runner_up: 'Sucko Runner-Up (11th)',
  sucko_exit:      'Sucko Bowl',
}

const RESULT_BADGE: Record<PlayoffResultType, string> = {
  champion:        'badge badge-champion',
  runner_up:       'badge badge-runner-up',
  third:           'badge badge-third',
  fourth:          'badge',
  fifth:           'badge',
  sixth:           'badge',
  first_round_exit:'badge',
  sucko_winner:    'badge badge-defunct',
  sucko_runner_up: 'badge',
  sucko_exit:      'badge',
}

export default async function PlayoffStatsPage() {
  const [teams, seasons, allResults] = await Promise.all([
    getTeams(),
    getSeasons(),
    getPlayoffResults(),
  ])

  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year)

  // All-time winners bracket summary per team
  const playoffAllTime = teams.map(team => {
    const results = allResults.filter(pr => pr.team_id === team.id && pr.bracket === 'winners')
    const champs  = results.filter(r => r.result === 'champion').length
    const ru      = results.filter(r => r.result === 'runner_up').length
    const thirds  = results.filter(r => r.result === 'third').length
    const apps    = results.length
    return { team, apps, champs, ru, thirds }
  }).filter(r => r.apps > 0).sort((a, b) => b.champs - a.champs || b.apps - a.apps)

  // Sucko Bowl summary per team
  const suckoAllTime = teams.map(team => {
    const results = allResults.filter(pr => pr.team_id === team.id && pr.bracket === 'sucko')
    const wins    = results.filter(r => r.result === 'sucko_winner').length
    const apps    = results.length
    return { team, apps, wins }
  }).filter(r => r.apps > 0).sort((a, b) => b.wins - a.wins || b.apps - a.apps)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Trophy style={{ color: 'var(--gold)' }} />
          <h1 className="text-4xl font-extrabold">Playoff Stats</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Winners bracket · Sucko Bowl · all-time records
        </p>
      </div>

      {/* All-Time Playoff Records */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">All-Time Playoff Appearances</h2>
        <div className="card overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Owner</th>
                <th>Appearances</th>
                <th>Championships</th>
                <th>Runner-Up</th>
                <th>3rd Place</th>
              </tr>
            </thead>
            <tbody>
              {playoffAllTime.map(row => (
                <tr key={row.team.id}>
                  <td className="font-semibold">{row.team.current_name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.team.owner_name}</td>
                  <td>{row.apps}</td>
                  <td>
                    {row.champs > 0
                      ? <span className="badge badge-champion">🏆 {row.champs}</span>
                      : <span style={{ color: 'var(--text-secondary)' }}>—</span>}
                  </td>
                  <td>{row.ru > 0     ? row.ru     : <span style={{ color: 'var(--text-secondary)' }}>—</span>}</td>
                  <td>{row.thirds > 0 ? row.thirds : <span style={{ color: 'var(--text-secondary)' }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* All-Time Sucko Bowl Records */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">All-Time Sucko Bowl Appearances</h2>
        <div className="card overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Owner</th>
                <th>Appearances</th>
                <th>Sucko Titles 💀</th>
              </tr>
            </thead>
            <tbody>
              {suckoAllTime.map(row => (
                <tr key={row.team.id}>
                  <td className="font-semibold">{row.team.current_name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.team.owner_name}</td>
                  <td>{row.apps}</td>
                  <td>
                    {row.wins > 0
                      ? <span className="badge badge-defunct">💀 {row.wins}</span>
                      : <span style={{ color: 'var(--text-secondary)' }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Season-by-Season Results */}
      <section className="space-y-6">
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
              <h3 className="text-lg font-semibold" style={{ color: 'var(--accent-light)' }}>{season.year}</h3>
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Winners bracket */}
                {winners.length > 0 && (
                  <div className="card overflow-hidden">
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--surface-2)', color: 'var(--accent-light)' }}>
                      Playoffs
                    </div>
                    <table>
                      <tbody>
                        {winners.map(pr => {
                          const team = teams.find(t => t.id === pr.team_id)
                          return (
                            <tr key={pr.id}>
                              <td><span className={RESULT_BADGE[pr.result] ?? 'badge'}>{RESULT_LABEL[pr.result] ?? pr.result}</span></td>
                              <td className="font-semibold">{getTeamCurrentName(pr.team_id, teams)}</td>
                              <td style={{ color: 'var(--text-secondary)' }}>{team?.owner_name}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sucko Bowl */}
                {sucko.length > 0 && (
                  <div className="card overflow-hidden">
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--surface-2)', color: 'var(--text-secondary)' }}>
                      Sucko Bowl
                    </div>
                    <table>
                      <tbody>
                        {sucko.map(pr => {
                          const team = teams.find(t => t.id === pr.team_id)
                          return (
                            <tr key={pr.id}>
                              <td><span className={RESULT_BADGE[pr.result] ?? 'badge'}>{RESULT_LABEL[pr.result] ?? pr.result}</span></td>
                              <td className="font-semibold">{getTeamCurrentName(pr.team_id, teams)}</td>
                              <td style={{ color: 'var(--text-secondary)' }}>{team?.owner_name}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
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
