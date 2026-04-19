import { Metadata } from 'next'
import { Trophy } from 'lucide-react'
import { teams, seasons, playoffResults, getTeamCurrentName } from '@/lib/placeholder-data'

export const metadata: Metadata = { title: 'Playoff Stats' }

const RESULT_ORDER = ['champion', 'runner_up', 'third', 'fourth', 'first_round_exit']
const RESULT_LABEL: Record<string, string> = {
  champion:         '🏆 Champion',
  runner_up:        '🥈 Runner-Up',
  third:            '🥉 3rd Place',
  fourth:           '4th Place',
  first_round_exit: 'First Round Exit',
}
const RESULT_BADGE: Record<string, string> = {
  champion:         'badge badge-champion',
  runner_up:        'badge badge-runner-up',
  third:            'badge badge-third',
  fourth:           'badge',
  first_round_exit: 'badge',
}

function allTimePlayoffTable() {
  return teams.map(team => {
    const results = playoffResults.filter(pr => pr.team_id === team.id)
    const champs = results.filter(r => r.result === 'champion').length
    const ru = results.filter(r => r.result === 'runner_up').length
    const thirds = results.filter(r => r.result === 'third').length
    const apps = results.length
    return { team, apps, champs, ru, thirds, results }
  }).filter(r => r.apps > 0).sort((a, b) => b.champs - a.champs || b.apps - a.apps)
}

export default function PlayoffStatsPage() {
  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year)
  const playoffAllTime = allTimePlayoffTable()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Trophy style={{ color: 'var(--gold)' }} />
          <h1 className="text-4xl font-extrabold">Playoff Stats</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Winner&apos;s bracket results · all-time playoff records
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
                  <td className="font-semibold">{getTeamCurrentName(row.team.id)}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.team.owner_name}</td>
                  <td>{row.apps}</td>
                  <td>
                    {row.champs > 0
                      ? <span className="badge badge-champion">🏆 {row.champs}</span>
                      : <span style={{ color: 'var(--text-secondary)' }}>—</span>}
                  </td>
                  <td>{row.ru > 0 ? row.ru : <span style={{ color: 'var(--text-secondary)' }}>—</span>}</td>
                  <td>{row.thirds > 0 ? row.thirds : <span style={{ color: 'var(--text-secondary)' }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Season-by-Season Playoff Results */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold">Season Results</h2>
        {sortedSeasons.map(season => {
          const results = playoffResults
            .filter(pr => pr.season_id === season.id)
            .sort((a, b) => RESULT_ORDER.indexOf(a.result) - RESULT_ORDER.indexOf(b.result))

          if (results.length === 0) return null

          return (
            <div key={season.id} className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--accent-light)' }}>{season.year}</h3>
              <div className="card overflow-hidden">
                <table>
                  <thead>
                    <tr>
                      <th>Finish</th>
                      <th>Team</th>
                      <th>Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(pr => {
                      const team = teams.find(t => t.id === pr.team_id)
                      return (
                        <tr key={pr.id}>
                          <td><span className={RESULT_BADGE[pr.result] ?? 'badge'}>{RESULT_LABEL[pr.result] ?? pr.result}</span></td>
                          <td className="font-semibold">{getTeamCurrentName(pr.team_id)}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{team?.owner_name}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </section>

    </div>
  )
}
