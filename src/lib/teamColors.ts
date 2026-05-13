const PALETTE = [
  { bg: 'rgba(99,102,241,0.18)',  text: '#818cf8', border: 'rgba(99,102,241,0.4)' },
  { bg: 'rgba(244,63,94,0.18)',   text: '#fb7185', border: 'rgba(244,63,94,0.4)' },
  { bg: 'rgba(16,185,129,0.18)',  text: '#34d399', border: 'rgba(16,185,129,0.4)' },
  { bg: 'rgba(245,158,11,0.18)',  text: '#fbbf24', border: 'rgba(245,158,11,0.4)' },
  { bg: 'rgba(14,165,233,0.18)',  text: '#38bdf8', border: 'rgba(14,165,233,0.4)' },
  { bg: 'rgba(139,92,246,0.18)',  text: '#a78bfa', border: 'rgba(139,92,246,0.4)' },
  { bg: 'rgba(236,72,153,0.18)',  text: '#f472b6', border: 'rgba(236,72,153,0.4)' },
  { bg: 'rgba(249,115,22,0.18)',  text: '#fb923c', border: 'rgba(249,115,22,0.4)' },
  { bg: 'rgba(20,184,166,0.18)',  text: '#2dd4bf', border: 'rgba(20,184,166,0.4)' },
  { bg: 'rgba(132,204,22,0.18)',  text: '#a3e635', border: 'rgba(132,204,22,0.4)' },
  { bg: 'rgba(6,182,212,0.18)',   text: '#22d3ee', border: 'rgba(6,182,212,0.4)' },
  { bg: 'rgba(217,70,239,0.18)',  text: '#e879f9', border: 'rgba(217,70,239,0.4)' },
  { bg: 'rgba(100,116,139,0.15)', text: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  { bg: 'rgba(100,116,139,0.15)', text: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
]

export function getTeamColor(teamId: number) {
  return PALETTE[(teamId - 1) % PALETTE.length]
}
