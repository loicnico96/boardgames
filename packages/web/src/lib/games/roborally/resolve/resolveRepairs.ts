import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { CellType } from "../model"

export async function resolveRepairs(context: RoborallyContext): Promise<void> {
  const { playerOrder } = context.state

  const players: Record<string, { repair: number }> = {}

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (player.destroyed) {
      continue
    }

    const cell = getCell(context.state, player.pos)

    if (cell.type === CellType.REPAIR && player.damage > 0) {
      players[playerId] = { repair: 1 }

      context.updatePlayer(playerId, {
        damage: damage => damage - 1,
      })
    }
  }

  if (Object.keys(players).length > 0) {
    await context.post({
      code: "playerRepair",
      players,
    })
  }
}
