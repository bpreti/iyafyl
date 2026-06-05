import { Metadata } from 'next'
import { getTeams, getSeasons, getAllTeamSeasons, getAllGames, getAllTeamNames } from '@/lib/queries'
import { computeRegularSeasonRecords, type RecordEntry, type RecordCategory } from '@/lib/records'

export const metadata: Metadata = { title: 'Regular Season Records' }

// ── Record card ───────────────────────────────────────────────────────────────

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg leading-none">🥇</span>
  if (rank === 2) return <span className="text-lg leading-none">🥈</span>
  if (rank === 3) return <span className="text-lg leading-none">🥉</span>
  return (
    <span className="text-xs font-bold w-5 text-center" style={{ color: 'var(--text-secondary)' }}>
      #{rank}
    </span>
  )
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
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>
            {entry.sublabel}
          </p>
        )}
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="font-bold text-sm tabular-nums" style={{ color: 'var(--accent-light)' }}>
          {entry.value}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {entry.context}
        </p>
      </div>
    </div>
  )
}

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

function RecordCard({ category }: { category: RecordCategory }) {
  const hStyle = headerStyles[category.variant]
  return (
    <div className="card overflow-hidden flex flex-col">
      {/* Tinted header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5" style={hStyle}>
        <span className="text-lg leading-none">{category.emoji}</span>
        <h2 className="text-sm font-bold leading-tight">{category.title}</h2>
      </div>
      {/* Entries */}
      <div className="px-5 pb-2 pt-1">
        {category.entries.map(entry => (
          <RecordRow key={entry.rank} entry={entry} />
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function RegularSeasonRecordsPage() {
  const [teams, seasons, teamSeasons, allGames, teamNames] = await Promise.all([
    getTeams(),
    getSeasons(),
    getAllTeamSeasons(),
    getAllGames(),
    getAllTeamNames(),
  ])

  const records = computeRegularSeasonRecords(allGames, seasons, teams, teamNames, teamSeasons)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold">Regular Season Records</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Top 5 all-time across {seasons.length} seasons of regular season play
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {records.map(category => (
          <RecordCard key={category.id} category={category} />
        ))}
      </div>

    </div>
  )
}
