export type LobbyData = {
  game_modes: Array<{
    game_mode_id: string
  }>
  lobbies: Array<{
    game_mode_id: string
    lobby_id: string
    max_players_direct: number
    max_players_normal: number
    max_players_party: number
    region_id: string
    total_player_count: number
  }>
  regions: Array<{
    datacenter_coord: {
      latitude: number
      longitude: number
    }
    datacenter_distance_from_client: {
      kilometers: number
      miles: number
    }
    provider_display_name: string
    region_display_name: string
    region_id: string
  }>
}
