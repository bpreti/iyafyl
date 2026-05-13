import { Metadata } from 'next'
import Link from 'next/link'
import { getTeams } from '@/lib/queries'
import { getTeamColor } from '@/lib/teamColors'
import type { TeamWithCurrentName } from '@/types'

export const metadata: Metadata = { title: 'Teams' }

function getInitials(name: string) {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default async function TeamsPage() {
  const teams = await getTeams()
  const active  = teams.filter(t => t.is_active)
  const defunct = teams.filter(t => !t.is_active)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold">The League</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {active.length} active competitors · {defunct.length} retired
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
          Active Teams
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {active.map(team => <TeamCard key={team.id} team={team} />)}
        </div>
      </section>

      {defunct.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            Hall of Retired Teams
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {defunct.map(team => <TeamCard key={team.id} team={team} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function TeamCard({ team }: { team: TeamWithCurrentName }) {
  const color = getTeamColor(team.id)
  const initials = getInitials(team.owner_name)

  return (
    <Link
      href={`/teams/${team.slug}`}
      className="card card-hover p-5 flex items-center gap-4 block"
      style={{ borderTopColor: color.border, borderTopWidth: '2px' }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0"
        style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-base leading-tight">{team.current_name}</p>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {team.owner_name}{team.is_commissioner ? ' · 🏅 Commissioner' : ''}
        </p>
        <span className={`badge mt-2 ${team.is_active ? 'badge-active' : 'badge-defunct'}`}>
          {team.is_active ? 'Active' : 'Retired'}
        </span>
      </div>
    </Link>
  )
}
