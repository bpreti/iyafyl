import { Metadata } from 'next'
import { getTeams, getSeasons, getPlayoffResults, getAllGames, getAllTeamNames, getTeamCurrentName } from '@/lib/queries'
import { computePlayoffRecords, type RecordEntry, type RecordCategory } from '@/lib/records'
import type { PlayoffResultType } from '@/types'

export const metadata: Metadata = { title: 'Playoff Records' }

// ── Shared record card (same pattern as regular season records) ───────────────

const headerStyles = {
  positive: {
    background: 'rgba(234,179,8,0.18)',
    borderBottom: '1px solid rgba(234,179,8,0.45)',
    color: '#713f12',
  },
  negative: {
    background: 'rgba(220,38,38,0.08)',
    borderBottom: '1px solid rgba(220,38,38,0.18)',
    color: '#991b1b',
  },
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg leading-none">🥇</span>
  if (rank === 2) return <span className="text-lg leading-none">🥈</span>
  if (rank === 3) return <span className="text-lg leading-none">🥉</span>
  return <span className="text-xs font-bold w-5 text-center" style={{ color: 'var(--text-secondary)' }}>#{rank}</span>
}

function RecordRow({ entry }: { entry: RecordEntry }) {
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
        <RankBadge rank={entry.rank} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-tight truncate">{entry.label}</p>
        {entry.sublabel && (
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>{entry.sublabel}</p>
        )}
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="font-bold text-sm tabular-nums" style={{ color: 'var(--accent-light)' }}>{entry.value}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{entry.context}</p>
      </div>
    </div>
  )
}

function RecordCard({ category }: { category: RecordCategory }) {
  const hStyle = headerStyles[category.variant]
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="flex items-center gap-2.5 px-5 py-3.5" style={hStyle}>
        <span className="text-lg leading-none">{category.emoji}</span>
        <h2 className="text-sm font-bold leading-tight">{category.title}</h2>
      </div>
      <div className="px-5 pb-2 pt-1">
        {category.entries.map(entry => (
          <RecordRow key={entry.rank} entry={entry} />
        ))}
      </div>
    </div>
  )
}

// ── Season results (preserved from original page) ─────────────────────────────

const WINNERS_ORDER: PlayoffResultType[] = ['champion', 'runner_up', 'third', 'fourth', 'fifth', 'sixth', 'first_round_exit']
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PlayoffRecordsPage() {
  const [teams, seasons, allResults, allGames, teamNames] = await Promise.all([
    getTeams(),
    getSeasons(),
    getPlayoffResults(),
    getAllGames(),
    getAllTeamNames(),
  ])

  const records = computePlayoffRecords(allGames, seasons, teams, teamNames, allResults)
  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold">Playoff Records</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          All-time records across {seasons.length} seasons · Winners bracket unless noted
        </p>
      </div>

      {/* Records grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {records.map(category => (
          <RecordCard key={category.id} category={category} />
        ))}
      </div>

      {/* Season-by-season results */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Season Results</h2>
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
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--surface-2)', color: 'var(--accent-light)', borderBottom: '1px solid var(--border)' }}>
                      Playoffs
                    </div>
                    <div>
                      {winners.map(pr => {
                        const team = teams.find(t => t.id === pr.team_id)
                        return (
                          <div key={pr.id} className="px-4 py-2.5 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
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
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--surface-2)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                      💀 Sucko Bowl
                    </div>
                    <div>
                      {sucko.map(pr => {
                        const team = teams.find(t => t.id === pr.team_id)
                        return (
                          <div key={pr.id} className="px-4 py-2.5 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
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
