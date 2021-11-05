import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { CellType } from "../model"

import { Move, resolveMoves } from "./resolveMoves"

export async function resolveGears(context: RoborallyContext): Promise<void> {
  const { playerOrder, players } = context.state

  const moves: Record<string, Move> = {}

  for (const playerId of playerOrder) {
    const player = players[playerId]

    if (player.destroyed) {
      continue
    }

    const cell = getCell(context.state, player.pos)

    if (cell.type === CellType.GEAR) {
      moves[playerId] = { rot: cell.rot }
    }
  }

  await resolveMoves(context, moves)
}
