interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="card p-5 flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
      <p
        className="stat-value"
        style={{ color: accent ? 'var(--accent-light)' : 'var(--text-primary)' }}
      >
        {value}
      </p>
      {sub && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{sub}</p>}
    </div>
  )
}
