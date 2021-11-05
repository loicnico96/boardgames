import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"

import { destroyPlayers } from "./destroyPlayers"

describe("destroyPlayers", () => {
  it("marks players as destroyed", async () => {
    const context = createTestContext(RoborallyContext, 3)

    const events = await run(context, destroyPlayers, ["player1"])

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)

      expect(player.destroyed).toBe(playerId === "player1")
    }

    expect(events).toStrictEqual([
      {
        code: "playerDestroy",
        players: {
          player1: {
            destroyed: true,
          },
        },
      },
    ])
  })
})
