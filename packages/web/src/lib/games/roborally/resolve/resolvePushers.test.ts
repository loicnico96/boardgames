import { Direction } from "@boardgames/utils"

import { run } from "lib/games/test/utils"

import { resolvePushers } from "./resolvePushers"
import { createRoborallyTestContext } from "./test/utils"

describe("resolvePushers", () => {
  it("moves players on active pushers", async () => {
    const context = await createRoborallyTestContext(4)

    context.update({
      $merge: {
        sequence: 2,
      },
      board: {
        $merge: {
          cells: {
            5: {
              5: {
                push: {
                  active: [1, 3],
                  dir: Direction.EAST,
                },
              },
            },
            6: {
              6: {
                push: {
                  active: [2, 4],
                  dir: Direction.WEST,
                },
              },
            },
          },
        },
      },
      players: {
        // On normal cell (will not be pushed)
        player1: {
          $merge: {
            pos: {
              x: 4,
              y: 4,
            },
            rot: Direction.NORTH,
            virtual: false,
          },
        },
        // On inactive pusher (will not be pushed)
        player2: {
          $merge: {
            pos: {
              x: 5,
              y: 5,
            },
            rot: Direction.SOUTH,
            virtual: false,
          },
        },
        // On active pusher (will be pushed)
        player3: {
          $merge: {
            pos: {
              x: 6,
              y: 6,
            },
            rot: Direction.NORTH,
            virtual: false,
          },
        },
        // On normal cell, but will be pushed by player3
        player4: {
          $merge: {
            pos: {
              x: 5,
              y: 6,
            },
            rot: Direction.SOUTH,
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolvePushers)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
      rot: Direction.NORTH,
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 5,
      },
      rot: Direction.SOUTH,
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 5,
        y: 6,
      },
      rot: Direction.NORTH,
    })

    expect(context.player("player4")).toMatchObject({
      pos: {
        x: 4,
        y: 6,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player3: {
            dir: Direction.WEST,
          },
          player4: {
            dir: Direction.WEST,
          },
        },
      },
    ])
  })
})
