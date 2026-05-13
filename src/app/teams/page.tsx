import { Metadata } from 'next'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { getTeams } from '@/lib/queries'
import type { TeamWithCurrentName } from '@/types'

export const metadata: Metadata = { title: 'Teams' }

export default async function TeamsPage() {
  const teams = await getTeams()
  const active  = teams.filter(t => t.is_active)
  const defunct = teams.filter(t => !t.is_active)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Users style={{ color: 'var(--accent-light)' }} />
          <h1 className="text-4xl font-extrabold">Teams</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          {active.length} active · {defunct.length} defunct
        </p>
      </div>

      {/* Active Teams */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>Active Teams</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {active.map(team => <TeamCard key={team.id} team={team} />)}
        </div>
      </section>

      {/* Defunct Teams */}
      {defunct.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>Defunct Teams</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {defunct.map(team => <TeamCard key={team.id} team={team} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function TeamCard({ team }: { team: TeamWithCurrentName }) {
  const initials = team.owner_name.slice(0, 2).toUpperCase()

  return (
    <Link href={`/teams/${team.slug}`} className="card card-hover p-5 flex items-center gap-4 block">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
        style={{ background: 'rgba(124,58,237,0.2)', color: 'var(--accent-light)' }}
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p className="font-semibold truncate">{team.current_name}</p>
        <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
          {team.owner_name}
          {team.is_commissioner && ' · Commissioner'}
        </p>
        <span className={`badge mt-1 ${team.is_active ? 'badge-active' : 'badge-defunct'}`}>
          {team.is_active ? 'Active' : 'Defunct'}
        </span>
      </div>
    </Link>
  )
}
