import { assert } from "@boardgames/utils"

import { SEQUENCE_COUNT } from "../constants"
import { RoborallyContext } from "../context"
import { GamePhase } from "../model"

import { nextPhase } from "./nextPhase"
import { resolveSequence } from "./resolveSequence"
import { resolveTurnEnd } from "./resolveTurnEnd"

export async function resolveTurn(context: RoborallyContext): Promise<void> {
  const { playerOrder } = context.state

  for (const playerId of playerOrder) {
    const player = context.player(playerId)
    assert(player.action?.code === "program", "Invalid action")
    context.updatePlayer(playerId, {
      $merge: {
        hand: [],
        powerDownNext: player.action.powerDown,
        program: player.action.program,
      },
    })
  }

  for (let sequence = 0; sequence < SEQUENCE_COUNT; sequence++) {
    await resolveSequence(context, sequence)

    const winnerId = context.state.playerOrder.find(playerId => {
      const checkpointCount = context.state.checkpoints.length - 1
      const player = context.player(playerId)
      return player.checkpoint === checkpointCount
    })

    if (winnerId !== undefined) {
      return context.endGame({
        code: "win",
        playerId: winnerId,
      })
    }
  }

  await resolveTurnEnd(context)

  context.update({ turn: turn => turn + 1 })

  for (const playerId of playerOrder) {
    context.requireAction(playerId)
  }

  return nextPhase(context, GamePhase.READY)
}
