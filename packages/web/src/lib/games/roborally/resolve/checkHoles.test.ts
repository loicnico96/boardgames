import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"

import { checkHoles } from "./checkHoles"

describe("checkHoles", () => {
  it("destroys players on holes, active traps, or out of board", async () => {
    const context = createTestContext(RoborallyContext, 6)

    context.update({
      $merge: {
        sequence: 3,
      },
      board: {
        $merge: {
          cells: {
            3: {
              3: {
                hole: true,
              },
            },
            4: {
              4: {
                hole: true,
              },
            },
            5: {
              5: {
                trap: {
                  active: [1, 3],
                },
              },
            },
            6: {
              6: {
                trap: {
                  active: [2, 4],
                },
              },
            },
          },
        },
      },
      players: {
        // Outside of board (will be destroyed)
        player1: {
          $merge: {
            pos: {
              x: -1,
              y: -1,
            },
          },
        },
        // On normal cell (will not be destroyed)
        player2: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
          },
        },
        // On hole (will be destroyed)
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
        // On hole, already destroyed (will not be destroyed)
        player4: {
          $merge: {
            destroyed: true,
            pos: {
              x: 4,
              y: 4,
            },
          },
        },
        // On active trap (will be destroyed)
        player5: {
          $merge: {
            pos: {
              x: 5,
              y: 5,
            },
          },
        },
        // On inactive trap (will not be destroyed)
        player6: {
          $merge: {
            pos: {
              x: 6,
              y: 6,
            },
          },
        },
      },
    })

    const events = await run(context, checkHoles)

    expect(context.player("player1")).toMatchObject({
      destroyed: true,
    })

    expect(context.player("player2")).toMatchObject({
      destroyed: false,
    })

    expect(context.player("player3")).toMatchObject({
      destroyed: true,
    })

    expect(context.player("player4")).toMatchObject({
      destroyed: true,
    })

    expect(context.player("player5")).toMatchObject({
      destroyed: true,
    })

    expect(context.player("player6")).toMatchObject({
      destroyed: false,
    })

    expect(events).toStrictEqual([
      {
        code: "playerDestroy",
        players: {
          player1: {
            destroyed: true,
          },
          player3: {
            destroyed: true,
          },
          player5: {
            destroyed: true,
          },
        },
      },
    ])
  })
})
