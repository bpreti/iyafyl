import { Metadata } from 'next'
import { BarChart2 } from 'lucide-react'
import { teams, teamSeasons, seasons, getTeamCurrentName } from '@/lib/placeholder-data'

export const metadata: Metadata = { title: 'Regular Season Stats' }

function allTimeTable() {
  const rows = teams.map(team => {
    const ts = teamSeasons.filter(t => t.team_id === team.id)
    const wins = ts.reduce((s, t) => s + t.wins, 0)
    const losses = ts.reduce((s, t) => s + t.losses, 0)
    const ties = ts.reduce((s, t) => s + t.ties, 0)
    const pf = ts.reduce((s, t) => s + Number(t.points_for), 0)
    const pa = ts.reduce((s, t) => s + Number(t.points_against), 0)
    const g = wins + losses + ties
    const wpct = g > 0 ? ((wins + ties * 0.5) / g) : 0
    return { team, wins, losses, ties, pf, pa, ppg: g > 0 ? pf / g : 0, wpct }
  }).sort((a, b) => b.wpct - a.wpct)
  return rows
}

export default function RegularSeasonStatsPage() {
  const allTime = allTimeTable()
  const latestSeasonId = Math.max(...seasons.map(s => s.id))
  const latestYear = seasons.find(s => s.id === latestSeasonId)?.year

  const latestStandings = teamSeasons
    .filter(ts => ts.season_id === latestSeasonId)
    .sort((a, b) => a.final_standing - b.final_standing)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <BarChart2 style={{ color: 'var(--accent-light)' }} />
          <h1 className="text-4xl font-extrabold">Regular Season Stats</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          All-time records and per-season standings
        </p>
      </div>

      {/* Latest Season Standings */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">{latestYear} Standings</h2>
        <div className="card overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Owner</th>
                <th>W</th>
                <th>L</th>
                <th>T</th>
                <th>Pts For</th>
                <th>Pts Against</th>
                <th>Playoffs</th>
              </tr>
            </thead>
            <tbody>
              {latestStandings.map(ts => {
                const team = teams.find(t => t.id === ts.team_id)
                if (!team) return null
                return (
                  <tr key={ts.id}>
                    <td className="font-bold" style={{ color: 'var(--text-secondary)' }}>#{ts.final_standing}</td>
                    <td className="font-semibold">{getTeamCurrentName(team.id)}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{team.owner_name}</td>
                    <td className="font-medium">{ts.wins}</td>
                    <td>{ts.losses}</td>
                    <td>{ts.ties}</td>
                    <td>{Number(ts.points_for).toLocaleString()}</td>
                    <td>{Number(ts.points_against).toLocaleString()}</td>
                    <td>
                      {ts.made_playoffs
                        ? <span className="badge badge-active">Yes</span>
                        : <span className="badge badge-defunct">No</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* All-Time Records */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">All-Time Records</h2>
        <div className="card overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Owner</th>
                <th>W</th>
                <th>L</th>
                <th>T</th>
                <th>Win%</th>
                <th>Pts For</th>
                <th>Pts Against</th>
                <th>PPG</th>
              </tr>
            </thead>
            <tbody>
              {allTime.map((row, i) => (
                <tr key={row.team.id}>
                  <td className="font-bold" style={{ color: 'var(--text-secondary)' }}>#{i + 1}</td>
                  <td className="font-semibold">{getTeamCurrentName(row.team.id)}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.team.owner_name}</td>
                  <td className="font-medium">{row.wins}</td>
                  <td>{row.losses}</td>
                  <td>{row.ties}</td>
                  <td style={{ color: 'var(--accent-light)' }}>{row.wpct.toFixed(3)}</td>
                  <td>{row.pf.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
                  <td>{row.pa.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
                  <td>{row.ppg.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
