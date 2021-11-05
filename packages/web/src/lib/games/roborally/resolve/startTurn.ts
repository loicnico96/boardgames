import { getDeck } from "../card"
import { RoborallyContext } from "../context"
import { GamePhase } from "../model"
import { getHandSize } from "../player"

import { nextPhase } from "./nextPhase"

export async function startTurn(context: RoborallyContext): Promise<void> {
  const { playerOrder } = context.state

  const deck = getDeck()

  context.generator.shuffle(deck)

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (!player.powerDown) {
      context.updatePlayer(playerId, {
        $merge: {
          hand: deck.splice(0, getHandSize(player)),
        },
      })
    }

    context.requireAction(playerId)
  }

  return nextPhase(context, GamePhase.PROGRAM)
}
