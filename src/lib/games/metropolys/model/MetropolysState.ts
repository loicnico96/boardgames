export const BUILDING_COUNT = 13
export const DISTRICT_COUNT = 55

export enum DistrictColor {
  BLUE = "blue",
  GRAY = "gray",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

export enum MissionShape {
  BRIDGES = "bridges",
  CHAINS = "chains",
  LAKES = "lakes",
  SECTORS = "sectors",
  TOWERS = "towers",
}

export enum Token {
  FANCY = "fancy",
  METRO = "metro",
  RUINS = "ruins",
}

export type DistrictBuilding = {
  height: number
  playerId: string
}

export type District = {
  building?: DistrictBuilding
  token?: Token
}

export type Bid = {
  district: number
  height: number
  playerId: string
}

export type MetropolysPlayer = {
  buildings: boolean[]
  color: DistrictColor
  name: string
  pass: boolean
  ready: boolean
  shape: MissionShape
  tokens: Record<Token, number>
}

export type MetropolysState = {
  bids: Bid[]
  currentPlayer: string
  districts: District[]
  lastRuins: string | null
  mostMetro: string | null
  playerOrder: string[]
  players: Record<string, MetropolysPlayer>
  scores: { playerId: string; score: number[] }[]
  turn: number
}

export function getBids(state: MetropolysState): Bid[] {
  return state.bids
}

export function getBidForDistrict(
  state: MetropolysState,
  districtId: number
): Bid | undefined {
  return state.bids.find(bid => bid.district === districtId)
}

export function getHighestBid(state: MetropolysState): Bid | undefined {
  return state.bids[state.bids.length - 1]
}

export function getDistrict(
  state: MetropolysState,
  districtId: number
): District | undefined {
  return state.districts[districtId]
}

export function getPlayer(state: MetropolysState, playerId: string) {
  return state.players[playerId]
}

export function getTokenCount(player: MetropolysPlayer, token: Token): number {
  return player.tokens[token]
}

export function getCurrentPlayerId(state: MetropolysState): string {
  return state.currentPlayer
}

export function getLastRuinsPlayerId(state: MetropolysState): string | null {
  return state.lastRuins
}

export function getMostMetroPlayerId(state: MetropolysState): string | null {
  return state.mostMetro
}

export function getMostMetroCount(state: MetropolysState): number {
  const playerId = getMostMetroPlayerId(state)
  return playerId ? getTokenCount(getPlayer(state, playerId), Token.METRO) : 0
}

export function isDistrictAvailable(
  state: MetropolysState,
  districtId: number
): boolean {
  const district = getDistrict(state, districtId)
  return (
    district !== undefined &&
    !district.building &&
    !getBidForDistrict(state, districtId)
  )
}
