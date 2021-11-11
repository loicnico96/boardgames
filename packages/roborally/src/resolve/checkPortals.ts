import { Position, isSamePos, size } from "@boardgames/utils"

import { getCell } from "../board"
import { RoborallyContext } from "../context"
import { isAffectedByBoard, isAffectedByPlayers } from "../player"

import { Move } from "./resolveMoves"

export async function checkPortals(
  context: RoborallyContext,
  moves: Record<string, Move>
) {
  const players: Record<string, { pos: Position }> = {}

  for (const playerId in moves) {
    const player = context.player(playerId)

    if (isAffectedByBoard(player) && moves[playerId].dir !== undefined) {
      const cell = getCell(context.state, player.pos)

      if (cell.portal) {
        const portalPos = cell.portal.pos
        const isOccupied = Object.values(context.state.players).some(
          otherPlayer =>
            isAffectedByPlayers(otherPlayer) &&
            isSamePos(otherPlayer.pos, portalPos)
        )

        if (!isOccupied) {
          players[playerId] = {
            pos: portalPos,
          }

          context.updatePlayer(playerId, {
            $merge: {
              pos: portalPos,
            },
          })
        }
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
