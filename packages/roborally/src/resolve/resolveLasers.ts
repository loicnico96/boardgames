import { getDir, isSamePos, movePos, size } from "@boardgames/utils"

import { isInBounds, isPassable } from "../board"
import { RoborallyContext } from "../context"
import { BoardLaser, RoborallyState } from "../model"
import { isAbleToFire, isAffectedByLasers } from "../player"

export type Laser = BoardLaser & {
  ignoreStart?: boolean
}

export async function resolveLasers(
  context: RoborallyContext,
  lasers: Laser[]
) {
  const { playerOrder } = context.state

  const players: Record<string, { damage: number }> = {}

  for (const laser of lasers) {
    const range = laser.range ?? 1000
    let { pos } = laser

    for (let distance = 0; distance < range; distance++) {
      if (!isInBounds(context.state, pos)) {
        break
      }

      if (distance > 0 || !laser.ignoreStart) {
        let hit = false

        for (const playerId of playerOrder) {
          const player = context.player(playerId)

          if (isAffectedByLasers(player) && isSamePos(pos, player.pos)) {
            context.updatePlayer(playerId, {
              damage: damage => damage + laser.damage,
            })

            players[playerId] ??= { damage: 0 }
            players[playerId].damage += laser.damage
            hit = true
          }
        }

        if (hit && !laser.pierce) {
          break
        }
      }

      if (!isPassable(context.state, pos, laser.dir)) {
        break
      }

      pos = movePos(pos, laser.dir)
    }
  }

  if (size(players) > 0) {
    await context.post({
      code: "playerDamage",
      players,
    })
  }
}

export async function resolveBoardLasers(context: RoborallyContext) {
  return resolveLasers(context, context.state.board.lasers)
}

export function getPlayerLasers(state: RoborallyState): Laser[] {
  return state.playerOrder.reduce((lasers, playerId) => {
    const player = state.players[playerId]

    if (isAbleToFire(player)) {
      lasers.push({
        damage: 1,
        dir: getDir(player.rot),
        ignoreStart: true,
        pos: player.pos,
      })
    }

    return lasers
  }, [] as Laser[])
}

export async function resolvePlayerLasers(context: RoborallyContext) {
  return resolveLasers(context, getPlayerLasers(context.state))
}
