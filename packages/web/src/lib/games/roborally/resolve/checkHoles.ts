import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { CellType } from "../model"

import { destroyPlayers } from "./destroyPlayers"

export async function checkHoles(context: RoborallyContext): Promise<void> {
  const { playerOrder } = context.state

  await destroyPlayers(
    context,
    playerOrder.filter(playerId => {
      const player = context.player(playerId)

      if (player.destroyed) {
        return false
      }

      const cell = getCell(context.state, player.pos)

      return cell.type === CellType.HOLE
    })
  )
}
