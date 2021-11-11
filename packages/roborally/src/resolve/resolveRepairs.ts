import { size } from "@boardgames/utils"

import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { isAffectedByBoard } from "../player"

export async function resolveRepairs(context: RoborallyContext) {
  const { playerOrder } = context.state

  const players: Record<string, { repair: number }> = {}

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (isAffectedByBoard(player)) {
      const cell = getCell(context.state, player.pos)

      if (cell.repair && player.damage > 0) {
        players[playerId] = { repair: 1 }

        context.updatePlayer(playerId, {
          damage: damage => damage - 1,
        })
      }
    }
  }

  if (size(players) > 0) {
    await context.post({
      code: "playerRepair",
      players,
    })
  }
}
