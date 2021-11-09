import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"

import { resolveGears } from "./resolveGears"

describe("resolveGears", () => {
  it("rotates players on gears", async () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      board: {
        $merge: {
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

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)

      expect(player.rot).toBe(
        {
          player1: Direction.NORTH,
          player2: Direction.EAST,
          player3: Direction.SOUTH,
          player4: Direction.WEST,
        }[playerId]
      )
    }

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
