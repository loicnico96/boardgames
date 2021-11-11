import { createTestContext, run } from "../../test/utils"

import { destroyPlayers } from "./destroyPlayers"

describe("destroyPlayers", () => {
  it("marks players as destroyed", async () => {
    const context = await createTestContext(2)

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
