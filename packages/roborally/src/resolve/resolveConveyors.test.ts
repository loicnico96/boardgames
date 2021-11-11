import { Direction } from "@boardgames/utils"

import { createTestContext, run } from "../../test/utils"

import { resolveConveyors } from "./resolveConveyors"

describe("resolveConveyors", () => {
  it("moves players on conveyors", async () => {
    const context = await createTestContext(4, {
      cells: {
        2: {
          2: {
            conveyor: {
              dir: Direction.EAST,
            },
          },
        },
        3: {
          3: {
            conveyor: {
              dir: Direction.SOUTH,
              fast: true,
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
          },
        },
        // On normal conveyor, will move
        player2: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
          },
        },
        // On fast conveyor, will move
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
        // Destroyed, will not move
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

    const events = await run(context, resolveConveyors)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 1,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 3,
        y: 2,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 3,
        y: 4,
      },
    })

    expect(context.player("player4")).toMatchObject({
      pos: {
        x: 3,
        y: 3,
      },
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player2: {
            dir: Direction.EAST,
          },
          player3: {
            dir: Direction.SOUTH,
          },
        },
      },
    ])
  })

  it("moves players on fast conveyors only", async () => {
    const context = await createTestContext(4, {
      cells: {
        2: {
          2: {
            conveyor: {
              dir: Direction.EAST,
            },
          },
        },
        3: {
          3: {
            conveyor: {
              dir: Direction.SOUTH,
              fast: true,
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
          },
        },
        // On normal conveyor, will not move
        player2: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
          },
        },
        // On fast conveyor, will move
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
        // Destroyed, will not move
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

    const events = await run(context, resolveConveyors, true)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 1,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 2,
        y: 2,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 3,
        y: 4,
      },
    })

    expect(context.player("player4")).toMatchObject({
      pos: {
        x: 3,
        y: 3,
      },
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player3: {
            dir: Direction.SOUTH,
          },
        },
      },
    ])
  })
})
