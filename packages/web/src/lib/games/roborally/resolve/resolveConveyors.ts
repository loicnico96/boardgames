import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { isAffectedByBoard } from "../player"

import { Move, resolveMoves } from "./resolveMoves"

export async function resolveConveyors(
  context: RoborallyContext,
  fastConveyorsOnly: boolean = false
) {
  const { playerOrder } = context.state

  const moves: Record<string, Move> = {}

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (isAffectedByBoard(player)) {
      const cell = getCell(context.state, player.pos)

      if (cell.conveyor) {
        if (cell.conveyor.fast || !fastConveyorsOnly) {
          // TODO: Conveyor rotations
          moves[playerId] = { dir: cell.conveyor.dir }
        }
      }
    }
  }

  await resolveMoves(context, moves)
}
