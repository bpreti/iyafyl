import type { SeasonNotableStats } from '@/lib/notableStats'
import { ALL_TIME_RECORDS } from '@/lib/notableStats'

function Record() {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full ml-1.5"
      style={{ background: 'rgba(234,179,8,0.15)', color: 'var(--gold)', border: '1px solid rgba(234,179,8,0.3)' }}
    >
      ⭐ All-Time Record
    </span>
  )
}

function StatCard({
  emoji,
  label,
  primary,
  secondary,
  isRecord,
}: {
  emoji: string
  label: string
  primary: string
  secondary: string
  isRecord: boolean
}) {
  return (
    <div
      className="rounded-xl p-4 space-y-2"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-base leading-none">{emoji}</span>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </p>
      </div>
      <p className="font-bold text-sm leading-tight">
        {primary}
        {isRecord && <Record />}
      </p>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{secondary}</p>
    </div>
  )
}

export default function NotableStats({ stats }: { stats: SeasonNotableStats }) {
  const { scoringChampion, mostPointsAgainst, mostRosterMoves, playerMVP } = stats

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm">📊</span>
        <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          Notable Stats
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          emoji="🏆"
          label="Scoring Champion"
          primary={scoringChampion.team}
          secondary={scoringChampion.points.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' pts'}
          isRecord={scoringChampion.points >= ALL_TIME_RECORDS.scoringPoints}
        />
        <StatCard
          emoji="⭐"
          label="Fantasy Player MVP"
          primary={playerMVP.player}
          secondary={`${playerMVP.team}${playerMVP.points != null ? ` · ${playerMVP.points.toLocaleString()} pts` : ''}`}
          isRecord={playerMVP.points != null && playerMVP.points >= ALL_TIME_RECORDS.mvpPoints}
        />
        <StatCard
          emoji="🔄"
          label="Most Roster Moves"
          primary={mostRosterMoves.team}
          secondary={`${mostRosterMoves.moves} moves`}
          isRecord={mostRosterMoves.moves >= ALL_TIME_RECORDS.rosterMoves}
        />
        <StatCard
          emoji="🎯"
          label="Most Points Against"
          primary={mostPointsAgainst.team}
          secondary={mostPointsAgainst.points.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' pts'}
          isRecord={mostPointsAgainst.points >= ALL_TIME_RECORDS.pointsAgainst}
        />
      </div>
    </div>
  )
}
