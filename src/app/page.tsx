import { Trophy, Star, Users, Calendar } from 'lucide-react'
import {
  teams, seasons, playoffResults, seasonAwards, getTeamCurrentName,
} from '@/lib/placeholder-data'
import Link from 'next/link'

const LATEST_SEASON_ID = 7
const LATEST_YEAR = 2025

const resultLabel: Record<string, string> = {
  champion: '🏆 Champion',
  runner_up: '🥈 Runner-Up',
  third: '🥉 3rd Place',
}

export default function HomePage() {
  const latestResults = playoffResults.filter(pr => pr.season_id === LATEST_SEASON_ID)
  const awards = seasonAwards.filter(a => a.season_id === LATEST_SEASON_ID)

  const champion = latestResults.find(r => r.result === 'champion')
  const runnerUp = latestResults.find(r => r.result === 'runner_up')
  const third = latestResults.find(r => r.result === 'third')
  const podium = [champion, runnerUp, third].filter(Boolean) as typeof latestResults

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Hero */}
      <section className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent-light)' }}>
          Official League Site
        </p>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          If You Ain&apos;t First<br />
          <span className="gradient-text">You&apos;re Last</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Est. 2019 · 14 Teams · {seasons.length} Seasons
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link href="/teams" className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all" style={{ background: 'var(--accent)', color: '#fff' }}>
            View Teams
          </Link>
          <Link href="/history" className="px-5 py-2.5 rounded-lg font-semibold text-sm border transition-all" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            League History
          </Link>
        </div>
      </section>

      {/* Quick stats bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: <Calendar size={18} />, label: 'Seasons', value: seasons.length },
          { icon: <Users size={18} />, label: 'Active Teams', value: teams.filter(t => t.is_active).length },
          { icon: <Trophy size={18} />, label: 'Latest Champion', value: champion ? getTeamCurrentName(champion.team_id) : '—' },
          { icon: <Star size={18} />, label: 'League Founded', value: 2019 },
        ].map(item => (
          <div key={item.label} className="card p-5 flex items-center gap-3">
            <span style={{ color: 'var(--accent-light)' }}>{item.icon}</span>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
              <p className="font-bold text-lg leading-tight">{item.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 2025 Results */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Trophy style={{ color: 'var(--gold)' }} />
          <h2 className="text-2xl font-bold">{LATEST_YEAR} League Results</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {podium.map((res, i) => {
            const teamName = getTeamCurrentName(res.team_id)
            const team = teams.find(t => t.id === res.team_id)
            const badgeClass = ['badge badge-champion', 'badge badge-runner-up', 'badge badge-third'][i]
            return (
              <Link key={res.id} href={`/teams/${team?.slug}`} className="card card-hover p-6 space-y-3 block">
                <span className={badgeClass}>{resultLabel[res.result]}</span>
                <p className="text-xl font-bold">{teamName}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{team?.owner_name}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Notable Stats */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Star style={{ color: 'var(--accent-light)' }} />
          <h2 className="text-2xl font-bold">{LATEST_YEAR} Notable Statistics</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {awards.map(award => {
            const teamName = award.team_id ? getTeamCurrentName(award.team_id) : null
            return (
              <div key={award.id} className="card p-5 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>
                  {award.label}
                </p>
                <p className="text-xl font-bold">{award.value}</p>
                {teamName && (
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {award.player_name ? `Roster: ${teamName}` : teamName}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Offseason Notes */}
      <section className="card p-8 space-y-4">
        <h2 className="text-xl font-bold">Offseason Notes</h2>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {[
            'Champion determining 2026 draft order methodology',
            'Trophy nameplates being shipped to winners',
            'Commissioner outreach planned for summer participation confirmation',
            'Late summer kickoff meeting and rules updates scheduled',
          ].map(note => (
            <li key={note} className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-light)' }} className="mt-0.5">→</span>
              {note}
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}
