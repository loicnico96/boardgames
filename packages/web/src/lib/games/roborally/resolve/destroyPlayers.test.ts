import { run } from "lib/games/test/utils"

import { destroyPlayers } from "./destroyPlayers"
import { createRoborallyTestContext } from "./test/utils"

describe("destroyPlayers", () => {
  it("marks players as destroyed", async () => {
    const context = await createRoborallyTestContext(2)

    const events = await run(context, destroyPlayers, ["player1"])

    expect(context.player("player1")).toMatchObject({
      destroyed: true,
    })

    expect(context.player("player2")).toMatchObject({
      destroyed: false,
    })

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
