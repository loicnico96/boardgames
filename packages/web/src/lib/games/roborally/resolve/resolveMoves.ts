import {
  Direction,
  getDir,
  movePos,
  reduce,
  isSamePos,
  size,
} from "@boardgames/utils"

import { isPassable } from "../board"
import { RoborallyContext } from "../context"
import { RoborallyPlayer, RoborallyState } from "../model"
import { isAffectedByPlayers } from "../player"

import { checkHoles } from "./checkHoles"
import { checkPortals } from "./checkPortals"

export type Move = {
  dir?: Direction
  push?: boolean
  rot?: number
}

export function isColliding(
  playerA: RoborallyPlayer,
  playerB: RoborallyPlayer,
  moveA?: Move,
  moveB?: Move
): boolean {
  if (isAffectedByPlayers(playerA) && isAffectedByPlayers(playerB)) {
    const posA =
      moveA?.dir !== undefined ? movePos(playerA.pos, moveA.dir) : playerA.pos
    const posB =
      moveB?.dir !== undefined ? movePos(playerB.pos, moveB.dir) : playerB.pos
    return isSamePos(posA, posB)
  }

  return false
}

export function getPreMoveCollidingPlayerId(
  state: RoborallyState,
  playerId: string,
  move: Move,
  moves: Record<string, Move>
): string | undefined {
  return state.playerOrder.find(otherPlayerId => {
    if (otherPlayerId === playerId) {
      return false
    }

    if (move?.dir === undefined) {
      return false
    }

    if (moves[otherPlayerId] !== undefined) {
      if (moves[otherPlayerId]?.dir !== getDir(move.dir + 2)) {
        return false
      }
    }

    return isColliding(
      state.players[playerId],
      state.players[otherPlayerId],
      move
    )
  })
}

export function getPostMoveCollidingPlayerId(
  state: RoborallyState,
  playerId: string,
  moves: Record<string, Move>
): string | undefined {
  return state.playerOrder.find(otherPlayerId => {
    if (otherPlayerId === playerId) {
      return false
    }

    return isColliding(
      state.players[playerId],
      state.players[otherPlayerId],
      moves[playerId],
      moves[otherPlayerId]
    )
  })
}

export function checkSingleMove(
  state: RoborallyState,
  playerId: string,
  move: Move,
  moves: Record<string, Move>
): string[] {
  function recursive(movingPlayerId: string, playerIds: string[]): string[] {
    const movingPlayer = state.players[movingPlayerId]

    if (move.dir === undefined) {
      return playerIds
    }

    if (!isPassable(state, movingPlayer.pos, move.dir)) {
      return []
    }

    const collidingPlayerId = getPreMoveCollidingPlayerId(
      state,
      movingPlayerId,
      move,
      moves
    )

    if (collidingPlayerId === undefined) {
      return playerIds
    }

    if (!move.push) {
      return []
    }

    return recursive(collidingPlayerId, [...playerIds, collidingPlayerId])
  }

  return recursive(playerId, [playerId])
}

export function checkMoves(
  state: RoborallyState,
  moves: Record<string, Move>
): Record<string, Move> {
  function recursive(baseMoves: Record<string, Move>): Record<string, Move> {
    const movePlayerIds: Record<string, string[]> = {}
    const moveCount: Record<string, number> = {}

    const possibleBaseMoves = reduce(
      baseMoves,
      (result, move, playerId) => {
        const playerIds = checkSingleMove(state, playerId, move, baseMoves)

        if (playerIds.length > 0) {
          result[playerId] = move

          movePlayerIds[playerId] = playerIds
          for (const pushedPlayerId of playerIds) {
            moveCount[pushedPlayerId] ??= 0
            moveCount[pushedPlayerId] += 1
          }
        }

        return result
      },
      {} as Record<string, Move>
    )

    const possiblePushMoves = reduce(
      possibleBaseMoves,
      (result, move, playerId) => {
        for (const movePlayerId of movePlayerIds[playerId]) {
          if (moveCount[movePlayerId] > 1) {
            return result
          }
        }

        result[playerId] = move

        return result
      },
      {} as Record<string, Move>
    )

    const pushMoves = reduce(
      possiblePushMoves,
      (result, move, playerId) => {
        for (const movePlayerId of movePlayerIds[playerId]) {
          result[movePlayerId] = move
        }

        return result
      },
      {} as Record<string, Move>
    )

    const validBaseMoves = reduce(
      possiblePushMoves,
      (result, move, playerId) => {
        for (const movePlayerId of movePlayerIds[playerId]) {
          const collidingPlayerId = getPostMoveCollidingPlayerId(
            state,
            movePlayerId,
            pushMoves
          )

          if (collidingPlayerId !== undefined) {
            return result
          }
        }

        result[playerId] = move

        return result
      },
      {} as Record<string, Move>
    )

    if (size(validBaseMoves) === size(baseMoves)) {
      return pushMoves
    }

    return recursive(validBaseMoves)
  }

  return recursive(moves)
}

export async function resolveMoves(
  context: RoborallyContext,
  moves: Record<string, Move>
): Promise<void> {
  const validMoves = checkMoves(context.state, moves)

  const players: Record<string, Move> = {}

  for (const playerId in validMoves) {
    const { dir, rot } = validMoves[playerId]

    players[playerId] = {}

    if (dir !== undefined) {
      players[playerId].dir = dir
      context.updatePlayer(playerId, { pos: p => movePos(p, dir) })
    }

    if (rot !== undefined) {
      players[playerId].rot = rot
      context.updatePlayer(playerId, { rot: r => r + rot })
    }
  }

  if (size(players) > 0) {
    await context.post({
      code: "playerMove",
      players,
    })

    await checkPortals(context, validMoves)

    await checkHoles(context)
  }
}
