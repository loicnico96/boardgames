import { BaseState } from "@boardgames/common"

import { DistrictSector, getDistrictSector } from "./districts"
import {
  getTokenCount,
  hasAvailableBuildings,
  hasPassed,
  MetropolysPlayer,
} from "./players"
import { Token } from "./tokens"

export type Bid = {
  district: number
  height: number
  playerId: string
}

export type DistrictBuilding = {
  height: number
  playerId: string
}

export type District = {
  building?: DistrictBuilding
  token?: Token
}

export interface MetropolysState extends BaseState<MetropolysPlayer> {
  bids: Bid[]
  currentPlayer: string
  districts: { [district in number]?: District }
  lastRuins: string | null
  mostMetro: string | null
  round: number
  sectors: DistrictSector[]
}

export function getAvailableDistricts(state: MetropolysState): number[] {
  return Object.keys(state.districts).map(Number)
}

export function getBids(state: MetropolysState): Bid[] {
  return state.bids
}

export function getBidForDistrict(
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
): District | undefined {
  return state.districts[district]
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

export function isAbleToBid(
  player: MetropolysPlayer,
  highestBid?: Bid
): boolean {
  const minHeight = highestBid ? highestBid.height + 1 : undefined
  return !hasPassed(player) && hasAvailableBuildings(player, minHeight)
}

export function isAbleToPass(state: MetropolysState): boolean {
  return state.bids.length === 0
}

export function isDistrictAvailable(
  state: MetropolysState,
  district: number
): boolean {
  return state.sectors.includes(getDistrictSector(district))
}

export function isSectorAvailable(
  state: MetropolysState,
  sector: DistrictSector
): boolean {
  return state.sectors.includes(sector)
}
