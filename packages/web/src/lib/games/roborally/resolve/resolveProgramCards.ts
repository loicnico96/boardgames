import {
  getDir,
  movePos,
  mutableSortBy,
  Pos,
  Rotation,
  samePos,
} from "@boardgames/utils"

import { getCell } from "../board"
import { CardAction, getCardAction, getCardPriority } from "../card"
import { RoborallyContext } from "../context"
import { CellType, RoborallyPlayer, RoborallyState } from "../model"

import { isAffectedByPlayers, resolveMoves } from "./resolveMoves"

export function isAlive(player: RoborallyPlayer): boolean {
  return !player.destroyed
}

export function isPoweredDown(player: RoborallyPlayer): boolean {
  return player.powerDown
}

export function isReady(player: RoborallyPlayer): boolean {
  return player.ready
}

export function isVirtual(player: RoborallyPlayer): boolean {
  return player.virtual
}

export function isAbleToMove(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isPoweredDown(player)
}

export function isAbleToTeleport(
  state: RoborallyState,
  player: RoborallyPlayer,
  pos: Pos
): boolean {
  if (!isAffectedByPlayers(player)) {
    return true
  }

  return state.playerOrder.some(otherPlayerId => {
    const otherPlayer = state.players[otherPlayerId]

    if (!isAffectedByPlayers(otherPlayer)) {
      return samePos(otherPlayer.pos, pos)
    }
  })
}

export async function resolvePlayerMove(
  context: RoborallyContext,
  playerId: string,
  rotation: number,
  distance: number,
  teleportDistance: number
): Promise<void> {
  const player = context.player(playerId)
  const cell = getCell(context.state, player.pos)
  const direction = getDir(player.rot + rotation)

  if (cell.type === CellType.TELEPORT) {
    const teleportPos = movePos(player.pos, direction, teleportDistance)
    if (isAbleToTeleport(context.state, player, teleportPos)) {
      context.updatePlayer(playerId, {
        $merge: {
          pos: teleportPos,
        },
      })

      await context.post({
        code: "playerTeleport",
        players: {
          [playerId]: {
            pos: teleportPos,
          },
        },
      })

      return
    }
  }

  const finalDistance = cell.water ? distance - 1 : distance

  for (let moved = 0; moved < finalDistance; moved++) {
    if (context.player(playerId).destroyed) {
      break
    }

    await resolveMoves(context, { [playerId]: { dir: direction, push: true } })
  }
}

export async function resolvePlayerRotate(
  context: RoborallyContext,
  playerId: string,
  rot: number
): Promise<void> {
  await resolveMoves(context, { [playerId]: { rot } })
}

export async function resolveProgramCard(
  context: RoborallyContext,
  playerId: string,
  card: number
): Promise<void> {
  const action = getCardAction(card)

  await context.post({
    code: "playerCard",
    playerId,
    card,
  })

  switch (action) {
    case CardAction.MOVE_1:
      return resolvePlayerMove(context, playerId, 0, 1, 3)

    case CardAction.MOVE_2:
      return resolvePlayerMove(context, playerId, 0, 2, 4)

    case CardAction.MOVE_3:
      return resolvePlayerMove(context, playerId, 0, 3, 5)

    case CardAction.MOVE_BACK:
      return resolvePlayerMove(context, playerId, 2, 1, 2)

    case CardAction.ROTATE_BACK:
      return resolvePlayerRotate(context, playerId, Rotation.RIGHT * 2)

    case CardAction.ROTATE_LEFT:
      return resolvePlayerRotate(context, playerId, Rotation.LEFT)

    case CardAction.ROTATE_RIGHT:
      return resolvePlayerRotate(context, playerId, Rotation.RIGHT)
  }
}

export async function resolveProgramCards(
  context: RoborallyContext,
  sequence: number
): Promise<void> {
  const { playerOrder, players } = context.state

  const playerActions = playerOrder.reduce((result, playerId) => {
    const card = players[playerId].program[sequence]

    if (card !== null) {
      result.push({ card, playerId })
    }

    return result
  }, [] as { card: number; playerId: string }[])

  mutableSortBy(playerActions, action => -getCardPriority(action.card))

  for (const { card, playerId } of playerActions) {
    context.update({
      $merge: {
        currentPlayerId: playerId,
      },
    })

    await resolveProgramCard(context, playerId, card)
  }

  context.update({
    $merge: {
      currentPlayerId: null,
    },
  })
}
