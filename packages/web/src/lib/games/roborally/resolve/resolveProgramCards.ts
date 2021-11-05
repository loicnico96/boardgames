import { Direction, getDir, mutableSortBy, Rotation } from "@boardgames/utils"

import { CardAction, getCardAction, getCardPriority } from "../card"
import { RoborallyContext } from "../context"

import { resolveMoves } from "./resolveMoves"

export async function resolvePlayerMove(
  context: RoborallyContext,
  playerId: string,
  dir: Direction,
  dis: number
): Promise<void> {
  for (let count = 0; count < dis; count++) {
    const player = context.player(playerId)

    if (player.destroyed) {
      return
    }

    await resolveMoves(context, { [playerId]: { dir, push: true } })
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
  const player = context.player(playerId)
  const action = getCardAction(card)

  await context.post("playerCard", {
    playerId,
    card,
  })

  switch (action) {
    case CardAction.MOVE_1:
      return resolvePlayerMove(context, playerId, getDir(player.rot), 1)

    case CardAction.MOVE_2:
      return resolvePlayerMove(context, playerId, getDir(player.rot), 2)

    case CardAction.MOVE_3:
      return resolvePlayerMove(context, playerId, getDir(player.rot), 3)

    case CardAction.MOVE_BACK:
      return resolvePlayerMove(context, playerId, getDir(player.rot + 2), 1)

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
