import { Metadata } from 'next'
import Link from 'next/link'
import { getTeams, getSeasons, getAllTeamSeasons } from '@/lib/queries'
import { getTeamColor } from '@/lib/teamColors'

export const metadata: Metadata = { title: 'Regular Season Stats' }

function getInitials(name: string) {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl leading-none">🥇</span>
  if (rank === 2) return <span className="text-xl leading-none">🥈</span>
  if (rank === 3) return <span className="text-xl leading-none">🥉</span>
  return <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>#{rank}</span>
}

export default async function RegularSeasonStatsPage() {
  const [teams, seasons, allTeamSeasons] = await Promise.all([
    getTeams(),
    getSeasons(),
    getAllTeamSeasons(),
  ])

  const latestSeason = seasons.reduce((max, s) => s.year > max.year ? s : max, seasons[0])
  const latestSeasonId = latestSeason?.id
  const latestYear = latestSeason?.year

  const latestStandings = allTeamSeasons
    .filter(ts => ts.season_id === latestSeasonId)
    .sort((a, b) => a.final_standing - b.final_standing)

  const allTime = teams.map(team => {
    const ts = allTeamSeasons.filter(t => t.team_id === team.id)
    const wins   = ts.reduce((s, t) => s + t.wins, 0)
    const losses = ts.reduce((s, t) => s + t.losses, 0)
    const ties   = ts.reduce((s, t) => s + t.ties, 0)
    const pf     = ts.reduce((s, t) => s + Number(t.points_for), 0)
    const pa     = ts.reduce((s, t) => s + Number(t.points_against), 0)
    const g      = wins + losses + ties
    const wpct   = g > 0 ? (wins + ties * 0.5) / g : 0
    const ppg    = g > 0 ? pf / g : 0
    return { team, wins, losses, ties, pf, pa, ppg, wpct, seasons: ts.length }
  }).filter(r => r.seasons > 0).sort((a, b) => b.wpct - a.wpct)

  const maxWpct = Math.max(...allTime.map(r => r.wpct), 0.001)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold">Regular Season</h1>
        <p style={{ color: 'var(--text-secondary)' }}>All-time records and per-season standings</p>
      </div>

      {/* Latest season standings */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">{latestYear} Standings</h2>
        <div className="space-y-2">
          {latestStandings.map(ts => {
            const team = teams.find(t => t.id === ts.team_id)
            if (!team) return null
            const color = getTeamColor(ts.team_id)
            const total = ts.wins + ts.losses + ts.ties
            const wpct = total > 0 ? (ts.wins + ts.ties * 0.5) / total : 0
            return (
              <Link key={ts.id} href={`/teams/${team.slug}`} className="card card-hover flex items-center gap-3 px-4 py-3">
                <div className="w-8 flex items-center justify-center flex-shrink-0">
                  <RankMedal rank={ts.final_standing} />
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: color.bg, color: color.text }}
                >
                  {getInitials(team.owner_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight truncate">{team.current_name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                    {team.owner_name} · {Number(ts.points_for).toLocaleString()} pts
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="font-mono text-sm font-semibold">
                    {ts.wins}–{ts.losses}{ts.ties > 0 ? `–${ts.ties}` : ''}
                  </span>
                  <div className="win-bar-track w-20">
                    <div className="win-bar-fill" style={{ width: `${wpct * 100}%` }} />
                  </div>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  {ts.made_playoffs
                    ? <span className="badge badge-active text-xs">Playoffs</span>
                    : <span className="badge badge-defunct text-xs">Out</span>}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* All-time records */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">All-Time Records</h2>
        <div className="space-y-2">
          {allTime.map((row, i) => {
            const color = getTeamColor(row.team.id)
            return (
              <Link key={row.team.id} href={`/teams/${row.team.slug}`} className="card card-hover flex items-center gap-3 px-4 py-3">
                <div className="w-8 flex items-center justify-center flex-shrink-0">
                  <RankMedal rank={i + 1} />
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: color.bg, color: color.text }}
                >
                  {getInitials(row.team.owner_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight truncate">{row.team.current_name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                    {row.team.owner_name} · {row.seasons} season{row.seasons !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="font-mono text-sm font-semibold">
                    {row.wins}–{row.losses}{row.ties > 0 ? `–${row.ties}` : ''}
                  </span>
                  <div className="win-bar-track w-20">
                    <div className="win-bar-fill" style={{ width: `${(row.wpct / maxWpct) * 100}%` }} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-sm font-bold" style={{ color: 'var(--accent-light)' }}>
                    {(row.wpct * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {row.ppg.toFixed(1)} ppg
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  )
}
