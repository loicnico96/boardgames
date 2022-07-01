import { BaseState } from "@boardgames/common"

import { getDistrictSector } from "../utils/board"

import { getTokenCount, MetropolysPlayer } from "./player"
import { Bid, District, DistrictSector, Token } from "./types"

export interface MetropolysState extends BaseState<MetropolysPlayer> {
  bids: Bid[]
  currentPlayer: string
  districts: Partial<Record<number, District>>
  lastRuins: string | null
  mostMetro: string | null
  round: number
  sectors: DistrictSector[]
}

export function getBids(state: MetropolysState): Bid[] {
  return state.bids
}

export function getBidsForDistrict(
  state: MetropolysState,
  district: number
): Bid | undefined {
  return state.bids.find(bid => bid.district === district)
}

export function getHighestBid(state: MetropolysState): Bid | undefined {
  return state.bids[state.bids.length - 1]
}

export function getDistrict(
  state: MetropolysState,
  district: number
): District {
  return state.districts[district] ?? {}
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
  return playerId ? getTokenCount(state.players[playerId], Token.METRO) : 0
}

export function getPlayer(
  state: MetropolysState,
  playerId: string
): MetropolysPlayer {
  return state.players[playerId]
}

export function isDistrictAvailable(
  state: MetropolysState,
  district: number
): boolean {
  const { building } = getDistrict(state, district)
  return (
    !building &&
    !getBidsForDistrict(state, district) &&
    state.sectors.includes(getDistrictSector(district))
  )
}
