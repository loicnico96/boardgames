import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "../../test/utils"

import { checkPortals } from "./checkPortals"

describe("checkPortals", () => {
  it("teleports if moving into a portal", async () => {
    const context = await createTestContext(2, {
      cells: {
        2: {
          2: {
            portal: {
              pos: {
                x: 6,
                y: 6,
              },
            },
          },
        },
        4: {
          4: {
            portal: {
              pos: {
                x: 8,
                y: 8,
              },
            },
          },
        },
        6: {
          6: {
            portal: {
              pos: {
                x: 2,
                y: 2,
              },
            },
          },
        },
        8: {
          8: {
            portal: {
              pos: {
                x: 4,
                y: 4,
              },
            },
          },
        },
      },
    })

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
            rot: Direction.NORTH,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 4,
              y: 4,
            },
            rot: Direction.NORTH,
          },
        },
      },
    })

    const events = await run(context, checkPortals, {
      player1: {
        dir: Direction.NORTH,
      },
      player2: {
        dir: Direction.SOUTH,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 6,
        y: 6,
      },
      rot: Direction.NORTH,
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 8,
        y: 8,
      },
      rot: Direction.NORTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerTeleport",
        players: {
          player1: {
            pos: {
              x: 6,
              y: 6,
            },
          },
          player2: {
            pos: {
              x: 8,
              y: 8,
            },
          },
        },
      },
    ])
  })

  it("does not teleport if staying on a portal", async () => {
    const context = await createTestContext(2, {
      cells: {
        2: {
          2: {
            portal: {
              pos: {
                x: 6,
                y: 6,
              },
            },
          },
        },
        4: {
          4: {
            portal: {
              pos: {
                x: 8,
                y: 8,
              },
            },
          },
        },
        6: {
          6: {
            portal: {
              pos: {
                x: 2,
                y: 2,
              },
            },
          },
        },
        8: {
          8: {
            portal: {
              pos: {
                x: 4,
                y: 4,
              },
            },
          },
        },
      },
    })

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
            rot: Direction.EAST,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 4,
              y: 4,
            },
            rot: Direction.NORTH,
          },
        },
      },
    })

    const events = await run(context, checkPortals, {
      player1: {
        rot: Rotation.RIGHT,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 2,
        y: 2,
      },
      rot: Direction.EAST,
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
      rot: Direction.NORTH,
    })

    expect(events).toStrictEqual([])
  })

  it("does not teleport if the destination is occupied", async () => {
    const context = await createTestContext(6, {
      cells: {
        2: {
          2: {
            portal: {
              pos: {
                x: 6,
                y: 6,
              },
            },
          },
        },
        4: {
          4: {
            portal: {
              pos: {
                x: 8,
                y: 8,
              },
            },
          },
        },
        6: {
          6: {
            portal: {
              pos: {
                x: 2,
                y: 2,
              },
            },
          },
        },
        8: {
          8: {
            portal: {
              pos: {
                x: 4,
                y: 4,
              },
            },
          },
        },
      },
    })

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
            rot: Direction.NORTH,
            virtual: false,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 6,
              y: 6,
            },
            rot: Direction.NORTH,
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, checkPortals, {
      player1: {
        dir: Direction.NORTH,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 2,
        y: 2,
      },
      rot: Direction.NORTH,
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 6,
        y: 6,
      },
      rot: Direction.NORTH,
    })

    expect(events).toStrictEqual([])
  })
})
