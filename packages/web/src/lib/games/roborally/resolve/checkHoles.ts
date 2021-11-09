import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { isAffectedByBoard } from "../player"

import { destroyPlayers } from "./destroyPlayers"

export async function checkHoles(context: RoborallyContext) {
  const { playerOrder, sequence } = context.state

  await destroyPlayers(
    context,
    playerOrder.filter(playerId => {
      const player = context.player(playerId)

      if (isAffectedByBoard(player)) {
        const cell = getCell(context.state, player.pos)

        if (cell.hole) {
          return cell.hole === true || cell.hole.active.includes(sequence)
        }
      }

      return false
    })
  )
}
