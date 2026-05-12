import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trophy, Shield } from 'lucide-react'
import {
  getTeams, getTeamBySlug, getTeamNamesForTeam, getTeamDetailData, computeCareerStats,
} from '@/lib/queries'
import StatCard from '@/components/StatCard'
import type { PlayoffResultType } from '@/types'

export async function generateStaticParams() {
  const teams = await getTeams()
  return teams.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const team = await getTeamBySlug(slug)
  if (!team) return { title: 'Team Not Found' }
  return { title: team.owner_name }
}

const resultLabel: Record<PlayoffResultType, { label: string; className: string }> = {
  champion:        { label: '🏆 Champion',        className: 'badge badge-champion' },
  runner_up:       { label: '🥈 Runner-Up',        className: 'badge badge-runner-up' },
  third:           { label: '🥉 3rd Place',        className: 'badge badge-third' },
  fourth:          { label: '4th Place',           className: 'badge' },
  fifth:           { label: '5th Place',           className: 'badge' },
  sixth:           { label: '6th Place',           className: 'badge' },
  first_round_exit:{ label: 'First Round Exit',   className: 'badge' },
  sucko_winner:    { label: '💀 Sucko Champ',      className: 'badge badge-defunct' },
  sucko_runner_up: { label: 'Sucko Runner-Up',    className: 'badge' },
  sucko_exit:      { label: 'Sucko Bowl',         className: 'badge' },
}

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const team = await getTeamBySlug(slug)
  if (!team) notFound()

  const [names, { teamSeasons, playoffResults }] = await Promise.all([
    getTeamNamesForTeam(team.id),
    getTeamDetailData(team.id),
  ])

  const career = computeCareerStats(team.id, teamSeasons, playoffResults)

  const currentName = names.find(n => n.end_year === null)?.name ?? names[names.length - 1]?.name ?? team.owner_name
  const previousNames = names.filter(n => n.end_year !== null)
  const initials = team.owner_name.slice(0, 2).toUpperCase()

  // Split by bracket
  const winnersResults = playoffResults.filter(pr => pr.bracket === 'winners')
  const suckoResults   = playoffResults.filter(pr => pr.bracket === 'sucko')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

      {/* Back */}
      <Link href="/teams" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> All Teams
      </Link>

      {/* Header */}
      <div className="flex items-start gap-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0"
          style={{ background: 'rgba(79,70,229,0.2)', color: 'var(--accent-light)' }}
        >
          {initials}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold">{currentName}</h1>
            <span className={`badge ${team.is_active ? 'badge-active' : 'badge-defunct'}`}>
              {team.is_active ? 'Active' : 'Defunct'}
            </span>
          </div>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {team.owner_name}
            {team.is_commissioner && ' · Commissioner'}
            {team.is_founder && ' · League Founder'}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Est. {team.joined_year}
          </p>
        </div>
      </div>

      {/* Previous names */}
      {previousNames.length > 0 && (
        <div className="card p-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            Previous Team Names
          </p>
          <div className="flex flex-wrap gap-2">
            {previousNames.map(n => (
              <span key={n.id} className="badge" style={{ background: 'var(--surface-2)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                {n.name} ({n.start_year}{n.end_year !== n.start_year ? `–${n.end_year}` : ''})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Career Stats */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={18} style={{ color: 'var(--accent-light)' }} />
          <h2 className="text-xl font-bold">Career Statistics</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Record" value={`${career.wins}-${career.losses}${career.ties > 0 ? `-${career.ties}` : ''}`} sub={`${career.winPct} win%`} />
          <StatCard label="Points/Game" value={career.ppg} sub="career average" accent />
          <StatCard label="Points For"     value={Number(career.pointsFor).toLocaleString()} />
          <StatCard label="Points Against" value={Number(career.pointsAgainst).toLocaleString()} />
          <StatCard label="Championships"       value={career.championships} accent={career.championships > 0} />
          <StatCard label="Playoff Appearances" value={career.playoffAppearances} />
          <StatCard label="Playoff Record"      value={career.playoffRecord} />
          <StatCard label="Seasons Played"      value={teamSeasons.length} />
        </div>
      </section>

      {/* Winners Bracket Playoff History */}
      {winnersResults.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy size={18} style={{ color: 'var(--gold)' }} />
            <h2 className="text-xl font-bold">Playoff History</h2>
          </div>
          <div className="card overflow-hidden">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {winnersResults.map(pr => {
                  const info = resultLabel[pr.result] ?? { label: pr.result, className: 'badge' }
                  return (
                    <tr key={pr.id}>
                      <td className="font-medium">{pr.season_year}</td>
                      <td><span className={info.className}>{info.label}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Sucko Bowl History */}
      {suckoResults.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💀</span>
            <h2 className="text-xl font-bold">Sucko Bowl History</h2>
          </div>
          <div className="card overflow-hidden">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {suckoResults.map(pr => {
                  const info = resultLabel[pr.result] ?? { label: pr.result, className: 'badge' }
                  return (
                    <tr key={pr.id}>
                      <td className="font-medium">{pr.season_year}</td>
                      <td><span className={info.className}>{info.label}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Season-by-Season */}
      {teamSeasons.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Season-by-Season</h2>
          <div className="card overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Record</th>
                  <th>Pts For</th>
                  <th>Pts Against</th>
                  <th>Standing</th>
                  <th>Playoffs</th>
                </tr>
              </thead>
              <tbody>
                {teamSeasons.map(ts => (
                  <tr key={ts.id}>
                    <td className="font-medium">{ts.season_year}</td>
                    <td>{ts.wins}-{ts.losses}{ts.ties > 0 ? `-${ts.ties}` : ''}</td>
                    <td>{Number(ts.points_for).toLocaleString()}</td>
                    <td>{Number(ts.points_against).toLocaleString()}</td>
                    <td>#{ts.final_standing}</td>
                    <td>
                      {ts.made_playoffs
                        ? <span className="badge badge-active">Yes</span>
                        : <span className="badge badge-defunct">No</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  )
}
