import { Direction } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"
import { CellType } from "../model"

import { resolveConveyors } from "./resolveConveyors"

describe("resolveConveyors", () => {
  it("moves players on conveyors", async () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      board: {
        $merge: {
          cells: {
            2: {
              2: {
                type: CellType.CONVEYOR,
                dir: Direction.EAST,
              },
            },
            3: {
              3: {
                type: CellType.CONVEYOR_FAST,
                dir: Direction.SOUTH,
              },
            },
          },
        },
      },
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

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)

      expect(player.pos).toStrictEqual(
        {
          player1: {
            x: 1,
            y: 1,
          },
          player2: {
            x: 3,
            y: 2,
          },
          player3: {
            x: 3,
            y: 4,
          },
          player4: {
            x: 3,
            y: 3,
          },
        }[playerId]
      )
    }

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
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      board: {
        $merge: {
          cells: {
            2: {
              2: {
                type: CellType.CONVEYOR,
                dir: Direction.EAST,
              },
            },
            3: {
              3: {
                type: CellType.CONVEYOR_FAST,
                dir: Direction.SOUTH,
              },
            },
          },
        },
      },
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

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)

      expect(player.pos).toStrictEqual(
        {
          player1: {
            x: 1,
            y: 1,
          },
          player2: {
            x: 2,
            y: 2,
          },
          player3: {
            x: 3,
            y: 4,
          },
          player4: {
            x: 3,
            y: 3,
          },
        }[playerId]
      )
    }

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
