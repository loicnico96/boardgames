import { RoomStatus } from "@boardgames/common"
import { filter } from "@boardgames/utils"

import { getTokenCount } from "../model/player"
import {
  getLastRuinsPlayerId,
  getMostMetroPlayerId,
  getPlayer,
  MetropolysState,
} from "../model/state"
import { DistrictSector, Mission, Token } from "../model/types"

import {
  getDistrictColor,
  getDistrictSector,
  isAdjacent,
  isBridge,
  LAKES,
  TOWERS,
} from "./board"

export const SCORE_COLOR = 2

export const SCORE_SHAPE_BRIDGES = 4
export const SCORE_SHAPE_CHAINS = 4
export const SCORE_SHAPE_LAKES = 5
export const SCORE_SHAPE_SECTORS = 4
export const SCORE_SHAPE_TOWERS = 7

export const SCORE_TOKEN_FANCY = 3
export const SCORE_TOKEN_METRO = 1
export const SCORE_TOKEN_RUINS = -1

export const SCORE_CARD_METRO = 3
export const SCORE_CARD_RUINS = -2

export const SCORE_SECTOR = 5

export const BUILDING_HEIGHTS = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]

export function getPlayerDistricts(
  state: MetropolysState,
  playerId: string,
  minHeight: number = 0
): number[] {
  return Object.keys(
    filter(
      state.districts,
      district =>
        district?.building?.playerId === playerId &&
        district.building.height >= minHeight
    )
  ).map(Number)
}

export function getDistrictChains(districts: number[]): number[][] {
  let remainingDistricts = districts
  const chains: number[][] = []

  while (remainingDistricts.length) {
    const chain = remainingDistricts.slice(0, 1)
    remainingDistricts = remainingDistricts.slice(1)

    while (remainingDistricts.length) {
      const adjacentDistricts = remainingDistricts.filter(districtA =>
        chain.some(districtB => isAdjacent(districtA, districtB))
      )

      if (!adjacentDistricts.length) {
        break
      }

      remainingDistricts = remainingDistricts.filter(
        district => !adjacentDistricts.includes(district)
      )

      chain.push(...adjacentDistricts)
    }

    chains.push(chain)
  }

  return chains
}

export function getPlayerColorScore(
  state: MetropolysState,
  playerId: string
): number {
  const playerColor = getPlayer(state, playerId).color
  const playerDistricts = getPlayerDistricts(state, playerId)
  return (
    playerDistricts.filter(
      district => getDistrictColor(district) === playerColor
    ).length * SCORE_COLOR
  )
}

export function getPlayerShapeScore(
  state: MetropolysState,
  playerId: string
): number {
  const playerShape = getPlayer(state, playerId).shape
  const playerDistricts = getPlayerDistricts(state, playerId)
  switch (playerShape) {
    case Mission.BRIDGES:
      // TODO - Each building can only count for one objective
      return (
        playerDistricts.filter(districtA =>
          playerDistricts.some(
            districtB => districtB > districtA && isBridge(districtA, districtB)
          )
        ).length * SCORE_SHAPE_BRIDGES
      )
    case Mission.CHAINS:
      return (
        getDistrictChains(playerDistricts).reduce(
          (result, chain) => result + Math.floor(chain.length / 3),
          0
        ) * SCORE_SHAPE_CHAINS
      )
    case Mission.LAKES:
      // TODO - Each building can only count for one objective
      return (
        LAKES.filter(
          districts =>
            playerDistricts.filter(district => districts.includes(district))
              .length >= 3
        ).length * SCORE_SHAPE_LAKES
      )
    case Mission.SECTORS:
      return (
        state.sectors.filter(
          sector =>
            playerDistricts.filter(
              district => getDistrictSector(district) === sector
            ).length >= 3
        ).length * SCORE_SHAPE_SECTORS
      )
    case Mission.TOWERS:
      // TODO - Each building can only count for one objective
      return (
        TOWERS.filter(
          districts =>
            playerDistricts.filter(district => districts.includes(district))
              .length >= 3
        ).length * SCORE_SHAPE_TOWERS
      )
  }
}

export function getSectorPlayerIds(
  state: MetropolysState,
  sector: DistrictSector
): string[] {
  let players = state.playerOrder
  for (let minHeight = 2; minHeight >= 0 && players.length >= 2; minHeight--) {
    const counts = players.map(
      playerId =>
        getPlayerDistricts(state, playerId, minHeight).filter(
          district => getDistrictSector(district) === sector
        ).length
    )

    const maxCount = Math.max(...counts)

    players = players.filter((_, index) => counts[index] === maxCount)
  }

  return players
}

export function getSectorScore(
  state: MetropolysState,
  playerId: string
): number {
  return (
    state.sectors.filter(sector =>
      getSectorPlayerIds(state, sector).includes(playerId)
    ).length * SCORE_SECTOR
  )
}

export function getTokenScore(
  state: MetropolysState,
  playerId: string,
  token: Token
): number {
  const count = getTokenCount(getPlayer(state, playerId), token)
  switch (token) {
    case Token.FANCY:
      return count * SCORE_TOKEN_FANCY
    case Token.METRO:
      return count * SCORE_TOKEN_METRO
    case Token.RUINS:
      return count * SCORE_TOKEN_RUINS
  }
}

export function getMostMetroScore(
  state: MetropolysState,
  playerId: string
): number {
  return getMostMetroPlayerId(state) === playerId ? SCORE_CARD_METRO : 0
}

export function getLastRuinsScore(
  state: MetropolysState,
  playerId: string
): number {
  return getLastRuinsPlayerId(state) === playerId ? SCORE_CARD_RUINS : 0
}

export function getPlayerScore(
  state: MetropolysState,
  playerId: string
): number {
  let score = 0

  score += getTokenScore(state, playerId, Token.FANCY)
  score += getTokenScore(state, playerId, Token.METRO)
  score += getTokenScore(state, playerId, Token.RUINS)
  score += getMostMetroScore(state, playerId)
  score += getLastRuinsScore(state, playerId)

  if (state.status === RoomStatus.FINISHED) {
    score += getPlayerColorScore(state, playerId)
    score += getPlayerShapeScore(state, playerId)
    score += getSectorScore(state, playerId)
  }

  return score
}
