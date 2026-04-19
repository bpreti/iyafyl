import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Trophy, FileText } from 'lucide-react'
import { seasons, playoffResults, seasonAwards, getTeamCurrentName } from '@/lib/placeholder-data'

export const metadata: Metadata = { title: 'History' }

const RESULT_BADGE: Record<string, string> = {
  champion:         'badge badge-champion',
  runner_up:        'badge badge-runner-up',
  third:            'badge badge-third',
}
const RESULT_LABEL: Record<string, string> = {
  champion:  '🏆 Champion',
  runner_up: '🥈 Runner-Up',
  third:     '🥉 3rd Place',
}

export default function HistoryPage() {
  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Clock style={{ color: 'var(--accent-light)' }} />
          <h1 className="text-4xl font-extrabold">League History</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          A look back at every season of IYAFYL
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {sortedSeasons.map(season => {
          const podium = playoffResults
            .filter(pr => pr.season_id === season.id && ['champion', 'runner_up', 'third'].includes(pr.result))
            .sort((a, b) => {
              const order = ['champion', 'runner_up', 'third']
              return order.indexOf(a.result) - order.indexOf(b.result)
            })
          const awards = seasonAwards.filter(a => a.season_id === season.id)

          return (
            <div key={season.id} className="card p-6 space-y-5">
              {/* Year header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                  style={{ background: 'rgba(79,70,229,0.2)', color: 'var(--accent-light)' }}
                >
                  {season.year}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{season.year} Season</h2>
                  {podium.find(p => p.result === 'champion') && (
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Champion: {getTeamCurrentName(podium.find(p => p.result === 'champion')!.team_id)}
                    </p>
                  )}
                </div>
              </div>

              {/* Podium */}
              {podium.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {podium.map(pr => (
                    <div key={pr.id} className="flex items-center gap-2">
                      <span className={RESULT_BADGE[pr.result] ?? 'badge'}>
                        {RESULT_LABEL[pr.result] ?? pr.result}
                      </span>
                      <span className="text-sm font-medium">{getTeamCurrentName(pr.team_id)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Awards */}
              {awards.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  {awards.map(award => (
                    <div key={award.id} className="flex flex-col rounded-lg p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-light)' }}>
                        {award.label}
                      </span>
                      <span className="font-semibold mt-0.5">{award.value}</span>
                      {award.team_id && (
                        <span className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                          {award.player_name ? `Roster: ${getTeamCurrentName(award.team_id)}` : getTeamCurrentName(award.team_id)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {podium.length === 0 && awards.length === 0 && (
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                  Season data coming soon — add stats to fill this in.
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* League Constitution */}
      <div className="card p-6 flex items-start gap-4">
        <FileText size={24} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
        <div className="space-y-1">
          <h3 className="text-lg font-bold">League Constitution</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            The governing rules and regulations of If You Ain&apos;t First You&apos;re Last.
            Link your constitution document here once the site is live.
          </p>
          <button
            className="mt-2 text-sm font-medium underline-offset-2 hover:underline"
            style={{ color: 'var(--accent-light)' }}
          >
            View Constitution →
          </button>
        </div>
      </div>

    </div>
  )
}
