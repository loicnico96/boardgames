import { Directions, movePos, Position } from "@boardgames/utils"

import { BOARD_SIZE } from "./constants"
import { BoardTile, CacaoState, EmptyTile, ForestType } from "./model"

export const EMPTY_TILE: EmptyTile = { type: null }

/**
 * Returns the initial board state.
 */
export function getInitialBoard(): CacaoState["board"] {
  const coord = Math.floor(BOARD_SIZE / 2) - 1

  return {
    [coord]: {
      [coord]: {
        type: ForestType.CACAO_1,
      },
    },
    [coord + 1]: {
      [coord + 1]: {
        type: ForestType.MARKET_2,
      },
    },
  }
}

/**
 * Returns the current tile at the given coordinates.
 */
export function getTile(state: CacaoState, pos: Position): BoardTile {
  return state.board[pos.x]?.[pos.y] ?? EMPTY_TILE
}

/**
 * Returns true if there is no tile at the given coordinates, false otherwise.
 */
export function isEmpty(state: CacaoState, pos: Position): boolean {
  return getTile(state, pos).type === null
}

/**
 * Returns true if the given coordinates is a Forest space, false otherwise.
 */
export function isForestSpace(pos: Position): boolean {
  return pos.x % 2 === pos.y % 2
}

/**
 * Returns true if the given coordinates is a Village space, false otherwise.
 */
export function isVillageSpace(pos: Position): boolean {
  return pos.x % 2 !== pos.y % 2
}

/**
 * Returns true if the Forest space can be filled, false otherwise.
 */
export function isFillable(
  state: CacaoState,
  forestPos: Position,
  villageExists: boolean = true
): boolean {
  if (isForestSpace(forestPos) && isEmpty(state, forestPos)) {
    const adjacentDirections = Directions.filter(direction => {
      const adjacentPos = movePos(forestPos, direction, 1)
      return !isEmpty(state, adjacentPos)
    })

    return adjacentDirections.length >= (villageExists ? 2 : 1)
  }

  return false
}
