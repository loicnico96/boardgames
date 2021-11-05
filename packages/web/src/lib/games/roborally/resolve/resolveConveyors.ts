import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { CellType } from "../model"

import { Move, resolveMoves } from "./resolveMoves"

export async function resolveConveyors(
  context: RoborallyContext,
  fastConveyorsOnly: boolean = false
): Promise<void> {
  const { playerOrder, players } = context.state

  const moves: Record<string, Move> = {}

  for (const playerId of playerOrder) {
    const player = players[playerId]

    if (player.destroyed) {
      continue
    }

    const cell = getCell(context.state, player.pos)

    if (cell.type === CellType.CONVEYOR_FAST) {
      // TODO: Conveyor rotations
      moves[playerId] = { dir: cell.dir }
    }

    if (cell.type === CellType.CONVEYOR && !fastConveyorsOnly) {
      // TODO: Conveyor rotations
      moves[playerId] = { dir: cell.dir }
    }
  }

  await resolveMoves(context, moves)
}
