import { Direction, movePos } from "@boardgames/utils"

import { RoborallyContext } from "../context"

import { checkHoles } from "./checkHoles"

export type Move = {
  dir?: Direction
  push?: boolean
  rot?: number
}

export async function resolveMoves(
  context: RoborallyContext,
  moves: Record<string, Move>
): Promise<void> {
  // TODO: Process movement rules (walls, pushing others...)
  const players: Record<string, Move> = {}

  for (const playerId in moves) {
    const { dir, rot } = moves[playerId]

    players[playerId] = {}

    if (dir !== undefined) {
      players[playerId].dir = dir
      context.updatePlayer(playerId, { pos: p => movePos(p, dir) })
    }

    if (rot !== undefined) {
      players[playerId].rot = rot
      context.updatePlayer(playerId, { rot: r => r + rot })
    }
  }

  if (Object.keys(players).length > 0) {
    await context.post({
      code: "playerMove",
      players,
    })

    await checkHoles(context)
  }
}
