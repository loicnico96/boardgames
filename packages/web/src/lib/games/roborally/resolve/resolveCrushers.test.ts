import { run } from "lib/games/test/utils"

import { resolveCrushers } from "./resolveCrushers"
import { createRoborallyTestContext } from "./test/utils"

describe("resolveCrushers", () => {
  it("destroys players on active crushers", async () => {
    const context = await createRoborallyTestContext(4, {
      cells: {
        5: {
          5: {
            crush: {
              active: [1, 3],
            },
          },
        },
        6: {
          6: {
            crush: {
              active: [1, 3],
            },
          },
        },
        7: {
          7: {
            crush: {
              active: [2, 4],
            },
          },
        },
      },
    })

    context.update({
      $merge: {
        sequence: 1,
      },
      players: {
        // On normal cell (will not be destroyed)
        player1: {
          $merge: {
            pos: {
              x: 4,
              y: 4,
            },
          },
        },
        // On active crusher (will be destroyed)
        player2: {
          $merge: {
            pos: {
              x: 5,
              y: 5,
            },
          },
        },
        // On active crusher, already destroyed (will not be destroyed)
        player3: {
          $merge: {
            destroyed: true,
            pos: {
              x: 6,
              y: 6,
            },
          },
        },
        // On inactive crusher (will not be destroyed)
        player4: {
          $merge: {
            pos: {
              x: 7,
              y: 7,
            },
          },
        },
      },
    })

    const events = await run(context, resolveCrushers)

    expect(context.player("player1")).toMatchObject({
      destroyed: false,
    })

    expect(context.player("player2")).toMatchObject({
      destroyed: true,
    })

    expect(context.player("player3")).toMatchObject({
      destroyed: true,
    })

    expect(context.player("player4")).toMatchObject({
      destroyed: false,
    })

    expect(events).toStrictEqual([
      {
        code: "playerDestroy",
        players: {
          player2: {
            destroyed: true,
          },
        },
      },
    ])
  })
})
