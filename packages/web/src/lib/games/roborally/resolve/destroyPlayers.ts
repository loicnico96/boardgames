import { size } from "@boardgames/utils"

import { RoborallyContext } from "../context"
import { isAlive } from "../player"

export async function destroyPlayers(
  context: RoborallyContext,
  playerIds: string[]
) {
  const players: Record<string, { destroyed: boolean }> = {}

  for (const playerId of playerIds) {
    const player = context.player(playerId)

    if (isAlive(player)) {
      players[playerId] = {
        destroyed: true,
      }

      context.updatePlayer(playerId, {
        $merge: {
          destroyed: true,
          powerDownNext: false,
          program: [null, null, null, null, null],
        },
      })
    }
  }

  if (size(players) > 0) {
    await context.post({
      code: "playerDestroy",
      players,
    })
  }
}
