export interface Team {
  id: number
  slug: string
  owner_name: string
  is_active: boolean
  joined_year: number
  is_commissioner: boolean
  is_founder: boolean
  logo_url: string | null
  current_name?: string
  ended_year: number | null
}

export interface TeamName {
  id: number
  team_id: number
  name: string
  start_year: number
  end_year: number | null
}

export interface Season {
  id: number
  year: number
}

export interface TeamSeason {
  id: number
  team_id: number
  season_id: number
  wins: number
  losses: number
  ties: number
  points_for: number
  points_against: number
  final_standing: number
  made_playoffs: boolean
  team?: Team
  season?: Season
  season_year?: number
}

export type PlayoffResultType =
  | 'champion'
  | 'runner_up'
  | 'third'
  | 'fourth'
  | 'fifth'
  | 'sixth'
  | 'first_round_exit'
  | 'sucko_winner'
  | 'sucko_runner_up'
  | 'sucko_exit'

export type PlayoffBracket = 'winners' | 'sucko'

export interface PlayoffResult {
  id: number
  season_id: number
  team_id: number
  result: PlayoffResultType
  bracket: PlayoffBracket
  team?: Team
  season?: Season
  season_year?: number
}

export interface SeasonAward {
  id: number
  season_id: number
  award_type: string
  label: string
  value: string
  team_id: number | null
  player_name: string | null
  team?: Team
}

export interface TeamWithStats extends Team {
  team_names: TeamName[]
  team_seasons: (TeamSeason & { season: Season })[]
  playoff_results: (PlayoffResult & { season: Season })[]
}

export interface Game {
  id: number
  season_id: number
  week: number
  home_team_id: number
  away_team_id: number
  home_score: string
  away_score: string
  is_playoff: boolean
  playoff_round: string | null
  point_difference: string
  combined_points: string
}

// Extended types returned from DB queries (season_year joined in)
export type TeamWithCurrentName = Team & { current_name: string }
export type TeamSeasonRow = TeamSeason & { season_year: number }
export type PlayoffResultRow = PlayoffResult & { season_year: number }
