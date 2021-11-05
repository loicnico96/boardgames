import { RoborallyContext } from "../context"

export async function destroyPlayers(
  context: RoborallyContext,
  playerIds: string[]
): Promise<void> {
  const players: Record<string, { destroyed: boolean }> = {}

  for (const playerId of playerIds) {
    const player = context.player(playerId)

    if (player.destroyed) {
      continue
    }

    players[playerId] = {
      destroyed: true,
    }

    context.updatePlayer(playerId, {
      $merge: {
        destroyed: true,
        powerDownNext: false,
        program: [null, null, null, null, null],
      },
    })
  }

  if (Object.keys(players).length > 0) {
    await context.post({
      code: "playerDestroy",
      players,
    })
  }
}
