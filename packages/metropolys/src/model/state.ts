import { BasePlayer, BaseState } from "@boardgames/common"

import { MetropolysAction } from "./action"

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

export interface DistrictBuilding {
  height: number
  playerId: string
}

export interface District {
  building?: DistrictBuilding
  token?: Token
}

export interface Bid {
  district: number
  height: number
  playerId: string
}

export interface MetropolysPlayer extends BasePlayer<MetropolysAction> {
  buildings: boolean[]
  color: DistrictColor
  name: string
  pass: boolean
  ready: boolean
  shape: MissionShape
  tokens: Record<Token, number>
}

export interface MetropolysState extends BaseState<MetropolysPlayer> {
  bids: Bid[]
  currentPlayer: string
  districts: District[]
  lastRuins: string | null
  mostMetro: string | null
  turn: number
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
  return state.districts[district]
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
  return playerId ? getTokenCount(state.players[playerId], Token.METRO) : 0
}

export function isDistrictAvailable(
  state: MetropolysState,
  district: number
): boolean {
  const { building } = getDistrict(state, district)
  return !building && !getBidsForDistrict(state, district)
}
