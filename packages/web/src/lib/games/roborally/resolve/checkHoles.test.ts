import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"
import { CellType } from "../model"

import { checkHoles } from "./checkHoles"

describe("checkHoles", () => {
  it("destroys players on holes or outside of board", async () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      board: {
        cells: {
          $set: {
            3: {
              3: {
                type: CellType.HOLE,
              },
            },
          },
        },
      },
      players: {
        // On normal cell, will not be destroyed
        player1: {
          $merge: {
            pos: {
              x: 2,
              y: 3,
            },
          },
        },
        // On hole, will be destroyed
        player2: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
        // Outside of board, will be destroyed
        player3: {
          $merge: {
            pos: {
              x: -3,
              y: 3,
            },
          },
        },
        // Already destroyed, will not be destroyed again
        player4: {
          $merge: {
            destroyed: true,
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
      },
    })

    const events = await run(context, checkHoles)

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)

      expect(player.destroyed).toBe(
        {
          player1: false,
          player2: true,
          player3: true,
          player4: true,
        }[playerId]
      )
    }

    expect(events).toStrictEqual([
      {
        code: "playerDestroy",
        players: {
          player2: {
            destroyed: true,
          },
          player3: {
            destroyed: true,
          },
        },
      },
    ])
  })
})
