import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"

import { resolveMoves } from "./resolveMoves"

describe("resolveMoves", () => {
  it("moves and rotates players", async () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.NORTH,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
            rot: Direction.EAST,
          },
        },
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
            rot: Direction.SOUTH,
          },
        },
        player4: {
          $merge: {
            pos: {
              x: 4,
              y: 4,
            },
            rot: Direction.WEST,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player2: {
        dir: Direction.NORTH,
      },
      player3: {
        rot: Rotation.RIGHT,
      },
      player4: {
        dir: Direction.EAST,
        rot: Rotation.LEFT,
      },
    })

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
            y: 1,
          },
          player3: {
            x: 3,
            y: 3,
          },
          player4: {
            x: 5,
            y: 4,
          },
        }[playerId]
      )

      expect(player.rot).toStrictEqual(
        {
          player1: Direction.NORTH,
          player2: Direction.EAST,
          player3: Direction.WEST,
          player4: Direction.SOUTH,
        }[playerId]
      )
    }

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player2: {
            dir: Direction.NORTH,
          },
          player3: {
            rot: Rotation.RIGHT,
          },
          player4: {
            dir: Direction.EAST,
            rot: Rotation.LEFT,
          },
        },
      },
    ])
  })
})
