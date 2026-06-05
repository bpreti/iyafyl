export interface SeasonNotableStats {
  year: number
  scoringChampion: { team: string; points: number }
  mostPointsAgainst: { team: string; points: number }
  mostRosterMoves: { team: string; moves: number }
  playerMVP: { player: string; team: string; points?: number }
}

export const NOTABLE_STATS: SeasonNotableStats[] = [
  {
    year: 2019,
    scoringChampion:   { team: "I Digg this Thielen",            points: 1373.50 },
    mostPointsAgainst: { team: "The Pacmen",                     points: 1327.80 },
    mostRosterMoves:   { team: "Haskins' Havoc",                 moves: 32 },
    playerMVP:         { player: "Lamar Jackson", team: "Reed It and Weep", points: 415.68 },
  },
  {
    year: 2020,
    scoringChampion:   { team: "Dead Skins",                     points: 1408.52 },
    mostPointsAgainst: { team: "Hoos' Don't Lose Wahoowa",       points: 1384.12 },
    mostRosterMoves:   { team: "The No Names",                   moves: 71 },
    playerMVP:         { player: "Josh Allen", team: "Reed It and Weep", points: 395.06 },
  },
  {
    year: 2021,
    scoringChampion:   { team: "Reed It and Weep",               points: 1581.10 },
    mostPointsAgainst: { team: "The Alphabet Mafia",             points: 1536.02 },
    mostRosterMoves:   { team: "The No Names",                   moves: 67 },
    playerMVP:         { player: "Josh Allen", team: "The Pacmen", points: 378.72 },
  },
  {
    year: 2022,
    scoringChampion:   { team: "Just Here So I Don't Get Fined", points: 1467.06 },
    mostPointsAgainst: { team: "NFL Antics",                     points: 1462.98 },
    mostRosterMoves:   { team: "The Cast Aways",                 moves: 58 },
    playerMVP:         { player: "Patrick Mahomes", team: "So. Florida Sloths", points: 416.4 },
  },
  {
    year: 2023,
    scoringChampion:   { team: "Greenville Powder Puff",         points: 1527.06 },
    mostPointsAgainst: { team: "Straight Outta Tomlin",          points: 1513.12 },
    mostRosterMoves:   { team: "The Team Who Lived",             moves: 44 },
    playerMVP:         { player: "Josh Allen", team: "Obi-Wan-Mahomie", points: 392.64 },
  },
  {
    year: 2024,
    scoringChampion:   { team: "Just Here So I Don't Get Fined", points: 1708.30 },
    mostPointsAgainst: { team: "Tomlin's Troopers",              points: 1488.60 },
    mostRosterMoves:   { team: "Tomlin's Troopers",              moves: 53 },
    playerMVP:         { player: "Lamar Jackson", team: "KOC Pit", points: 407.4 },
  },
  {
    year: 2025,
    scoringChampion:   { team: "NFL Antics",                     points: 1474.20 },
    mostPointsAgainst: { team: "Just Here So I Don't Get Fined", points: 1493.62 },
    mostRosterMoves:   { team: "The Team Who Lived",             moves: 53 },
    playerMVP:         { player: "Josh Allen", team: "So. Florida Sloths", points: 364.62 },
  },
]

// All-time records (computed once)
export const ALL_TIME_RECORDS = {
  scoringPoints:   Math.max(...NOTABLE_STATS.map(s => s.scoringChampion.points)),
  pointsAgainst:   Math.max(...NOTABLE_STATS.map(s => s.mostPointsAgainst.points)),
  rosterMoves:     Math.max(...NOTABLE_STATS.map(s => s.mostRosterMoves.moves)),
  mvpPoints:       Math.max(...NOTABLE_STATS.filter(s => s.playerMVP.points != null).map(s => s.playerMVP.points!)),
}
