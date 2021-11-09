import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { CellType } from "../model"
import { isAffectedByBoard } from "../player"

import { Move, resolveMoves } from "./resolveMoves"

export async function resolveGears(context: RoborallyContext) {
  const { playerOrder } = context.state

  const moves: Record<string, Move> = {}

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (isAffectedByBoard(player)) {
      const cell = getCell(context.state, player.pos)

      if (cell.type === CellType.GEAR) {
        moves[playerId] = {
          rot: cell.rot,
        }
      }
    }
  }

  await resolveMoves(context, moves)
}
