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
}

export interface PlayoffResult {
  id: number
  season_id: number
  team_id: number
  result: 'champion' | 'runner_up' | 'third' | 'fourth' | 'first_round_exit'
  team?: Team
  season?: Season
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
