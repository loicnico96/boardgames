import { getCell, isActiveCrusher } from "../board"
import { RoborallyContext } from "../context"
import { isAffectedByBoard } from "../player"

import { destroyPlayers } from "./destroyPlayers"

export async function resolveCrushers(context: RoborallyContext) {
  const { playerOrder, sequence } = context.state

  await destroyPlayers(
    context,
    playerOrder.filter(playerId => {
      const player = context.player(playerId)

      if (isAffectedByBoard(player)) {
        const cell = getCell(context.state, player.pos)

        return isActiveCrusher(cell, sequence)
      }

      return false
    })
  )
}
