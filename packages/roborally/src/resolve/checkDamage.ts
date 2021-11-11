import { MAX_DAMAGE } from "../constants"
import { RoborallyContext } from "../context"
import { isAlive } from "../player"

import { destroyPlayers } from "./destroyPlayers"

export async function checkDamage(context: RoborallyContext) {
  const { playerOrder } = context.state

  await destroyPlayers(
    context,
    playerOrder.filter(playerId => {
      const player = context.player(playerId)
      return isAlive(player) && player.damage >= MAX_DAMAGE
    })
  )
}
