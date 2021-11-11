import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { isAffectedByBoard } from "../player"

import { Move, resolveMoves } from "./resolveMoves"

export async function resolvePushers(context: RoborallyContext) {
  const { playerOrder, sequence } = context.state

  const moves: Record<string, Move> = {}

  for (const playerId of playerOrder) {
    const player = context.player(playerId)

    if (isAffectedByBoard(player)) {
      const cell = getCell(context.state, player.pos)

      if (cell.push) {
        if (cell.push.active.includes(sequence)) {
          moves[playerId] = {
            dir: cell.push.dir,
            push: true,
          }
        }
      }
    }
  }

  await resolveMoves(context, moves)
}
