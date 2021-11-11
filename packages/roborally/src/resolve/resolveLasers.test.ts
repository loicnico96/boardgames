import { Direction } from "@boardgames/utils"

import { createTestContext, run } from "../../test/utils"

import { resolveBoardLasers, resolvePlayerLasers } from "./resolveLasers"

describe("resolvePlayerLasers", () => {
  it("damages players in front of other players", async () => {
    const context = await createTestContext(6, {
      cells: {
        5: {
          6: {
            walls: [Direction.EAST],
          },
        },
      },
    })

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 3,
              y: 5,
            },
            rot: Direction.NORTH,
            virtual: false,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 3,
              y: 6,
            },
            rot: Direction.EAST,
            virtual: false,
          },
        },
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 2,
            },
            rot: Direction.SOUTH,
            virtual: true,
          },
        },
        player4: {
          $merge: {
            pos: {
              x: 3,
              y: 1,
            },
            rot: Direction.SOUTH,
            virtual: false,
          },
        },
        player5: {
          $merge: {
            pos: {
              x: 6,
              y: 6,
            },
            rot: Direction.EAST,
            virtual: false,
          },
        },
        player6: {
          $merge: {
            pos: {
              x: 9,
              y: 1,
            },
            rot: Direction.WEST,
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolvePlayerLasers)

    expect(context.player("player1")).toMatchObject({
      damage: 1,
    })

    expect(context.player("player2")).toMatchObject({
      damage: 0,
    })

    expect(context.player("player3")).toMatchObject({
      damage: 0,
    })

    expect(context.player("player4")).toMatchObject({
      damage: 2,
    })

    expect(context.player("player5")).toMatchObject({
      damage: 0,
    })

    expect(context.player("player6")).toMatchObject({
      damage: 0,
    })

    expect(events).toStrictEqual([
      {
        code: "playerDamage",
        players: {
          player1: {
            damage: 1,
          },
          player4: {
            damage: 2,
          },
        },
      },
    ])
  })
})

describe("resolveBoardLasers", () => {
  it("damages players in front of board lasers", async () => {
    const context = await createTestContext(4, {
      cells: {
        5: {
          6: {
            walls: [Direction.EAST],
          },
        },
      },
      lasers: [
        {
          damage: 1,
          dir: Direction.EAST,
          pos: {
            x: 2,
            y: 6,
          },
        },
        {
          damage: 3,
          dir: Direction.SOUTH,
          pos: {
            x: 5,
            y: 3,
          },
        },
      ],
    })

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 5,
              y: 6,
            },
            rot: Direction.NORTH,
            virtual: false,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 4,
              y: 6,
            },
            rot: Direction.WEST,
            virtual: true,
          },
        },
        player3: {
          $merge: {
            pos: {
              x: 5,
              y: 7,
            },
            rot: Direction.NORTH,
            virtual: false,
          },
        },
        player4: {
          $merge: {
            pos: {
              x: 2,
              y: 5,
            },
            rot: Direction.EAST,
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveBoardLasers)

    expect(context.player("player1")).toMatchObject({
      damage: 4,
    })

    expect(context.player("player2")).toMatchObject({
      damage: 0,
    })

    expect(context.player("player3")).toMatchObject({
      damage: 0,
    })

    expect(context.player("player4")).toMatchObject({
      damage: 0,
    })

    expect(events).toStrictEqual([
      {
        code: "playerDamage",
        players: {
          player1: {
            damage: 4,
          },
        },
      },
    ])
  })
})
