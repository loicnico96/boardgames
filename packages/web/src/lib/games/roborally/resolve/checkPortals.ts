import { Pos, samePos, size } from "@boardgames/utils"

import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { CellType } from "../model"

import { isAffectedByPlayers, Move } from "./resolveMoves"

export async function checkPortals(
  context: RoborallyContext,
  moves: Record<string, Move>
): Promise<void> {
  const players: Record<string, { pos: Pos }> = {}

  for (const playerId in moves) {
    const player = context.player(playerId)

    if (player.destroyed) {
      continue
    }

    if (moves[playerId].dir === undefined) {
      continue
    }

    const cell = getCell(context.state, player.pos)

    if (cell.type === CellType.PORTAL) {
      const isOccupied = Object.values(context.state.players).some(
        otherPlayer =>
          isAffectedByPlayers(otherPlayer) && samePos(otherPlayer.pos, cell.pos)
      )

      if (!isOccupied) {
        players[playerId] = { pos: cell.pos }

        context.updatePlayer(playerId, {
          $merge: {
            pos: cell.pos,
          },
        })
      }
    }
  }

  if (size(players) > 0) {
    await context.post({
      code: "playerTeleport",
      players,
    })
  }
}
