import { getDir, samePos } from "@boardgames/utils"

import { RoborallyContext } from "../context"

export async function resolveCheckpoints(
  context: RoborallyContext
): Promise<void> {
  const { checkpoints, playerOrder } = context.state

  const players: Record<string, { checkpoint: number }> = {}

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (player.destroyed) {
      continue
    }

    const checkpoint = checkpoints.findIndex(pos => samePos(pos, player.pos))

    if (checkpoint === player.checkpoint) {
      context.updatePlayer(playerId, {
        $merge: {
          checkpointDir: getDir(player.rot),
        },
      })
    }

    if (checkpoint === player.checkpoint + 1) {
      players[playerId] = { checkpoint }

      context.updatePlayer(playerId, {
        $merge: {
          checkpoint,
          checkpointDir: getDir(player.rot),
        },
      })

      if (checkpoint === checkpoints.length - 1) {
        context.endGame()
      }
    }
  }

  if (Object.keys(players).length > 0) {
    await context.post("playerCheckpoint", { players })
  }
}
