import { Direction, Pos } from "@boardgames/utils"

import { RESPAWN_DAMAGE } from "../constants"
import { RoborallyContext } from "../context"
import { getLockedProgram } from "../player"

export async function resolveTurnEnd(context: RoborallyContext): Promise<void> {
  const { checkpoints, playerOrder } = context.state

  context.update({
    $merge: {
      sequence: null,
    },
  })

  const players: Record<string, { pos: Pos; dir: Direction }> = {}

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (player.destroyed) {
      const pos = checkpoints[player.checkpoint]
      const dir = player.checkpointDir

      players[playerId] = { pos, dir }

      context.updatePlayer(playerId, {
        $merge: {
          damage: RESPAWN_DAMAGE,
          destroyed: false,
          pos,
          powerDown: false,
          powerDownNext: false,
          program: [null, null, null, null, null],
          rot: dir,
          virtual: true,
        },
      })
    } else if (player.powerDown) {
      context.updatePlayer(playerId, {
        $merge: {
          damage: 0,
          powerDown: player.powerDownNext,
          powerDownNext: false,
          program: [null, null, null, null, null],
          virtual: false,
        },
      })
    } else if (player.powerDownNext) {
      context.updatePlayer(playerId, {
        $merge: {
          powerDown: true,
          powerDownNext: false,
          program: [null, null, null, null, null],
          virtual: false,
        },
      })
    } else {
      context.updatePlayer(playerId, {
        $merge: {
          powerDown: false,
          powerDownNext: false,
          program: getLockedProgram(player),
          virtual: false,
        },
      })
    }
  }

  if (Object.keys(players).length > 0) {
    await context.post({
      code: "playerRespawn",
      players,
    })
  }
}
