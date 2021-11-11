import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "../../test/utils"

import { resolveGears } from "./resolveGears"

describe("resolveGears", () => {
  it("rotates players on gears", async () => {
    const context = await createTestContext(4, {
      cells: {
        2: {
          2: {
            gear: {
              rot: Rotation.LEFT,
            },
          },
        },
        3: {
          3: {
            gear: {
              rot: Rotation.RIGHT,
            },
          },
        },
      },
    })

    context.update({
      players: {
        // On normal cell, will not rotate
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.NORTH,
          },
        },
        // On left-rotating gear, will rotate
        player2: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
            rot: Direction.SOUTH,
          },
        },
        // On right-rotating gear, will rotate
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
            rot: Direction.EAST,
          },
        },
        // Destroyed, will not rotate
        player4: {
          $merge: {
            destroyed: true,
            pos: {
              x: 3,
              y: 3,
            },
            rot: Direction.WEST,
          },
        },
      },
    })

    const events = await run(context, resolveGears)

    expect(context.player("player1")).toMatchObject({
      rot: Direction.NORTH,
    })

    expect(context.player("player2")).toMatchObject({
      rot: Direction.EAST,
    })

    expect(context.player("player3")).toMatchObject({
      rot: Direction.SOUTH,
    })

    expect(context.player("player4")).toMatchObject({
      rot: Direction.WEST,
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player2: {
            rot: Rotation.LEFT,
          },
          player3: {
            rot: Rotation.RIGHT,
          },
        },
      },
    ])
  })
})
