import { Direction } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"

import { resolveCheckpoints } from "./resolveCheckpoints"

describe("resolveCheckpoints", () => {
  it("registers reached checkpoints", async () => {
    const context = createTestContext(RoborallyContext, 6)

    context.update({
      checkpoints: {
        $set: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 3,
            y: 3,
          },
          {
            x: 6,
            y: 6,
          },
          {
            x: 9,
            y: 9,
          },
        ],
      },
      players: {
        // Not on checkpoint
        player1: {
          $merge: {
            checkpoint: 0,
            checkpointDir: Direction.NORTH,
            pos: {
              x: 2,
              y: 2,
            },
            rot: Direction.SOUTH,
          },
        },
        // On previous checkpoint
        player2: {
          $merge: {
            checkpoint: 1,
            checkpointDir: Direction.SOUTH,
            pos: {
              x: 0,
              y: 0,
            },
            rot: Direction.EAST,
          },
        },
        // On current checkpoint, but different direction
        player3: {
          $merge: {
            checkpoint: 1,
            checkpointDir: Direction.NORTH,
            pos: {
              x: 3,
              y: 3,
            },
            rot: Direction.SOUTH,
          },
        },
        // On next checkpoint
        player4: {
          $merge: {
            checkpoint: 1,
            checkpointDir: Direction.SOUTH,
            pos: {
              x: 6,
              y: 6,
            },
            rot: Direction.WEST,
          },
        },
        // On another checkpoint
        player5: {
          $merge: {
            checkpoint: 1,
            checkpointDir: Direction.WEST,
            pos: {
              x: 9,
              y: 9,
            },
            rot: Direction.EAST,
          },
        },
        // Destroyed
        player6: {
          $merge: {
            checkpoint: 2,
            checkpointDir: Direction.EAST,
            destroyed: true,
            pos: {
              x: 9,
              y: 9,
            },
            rot: Direction.SOUTH,
          },
        },
      },
    })

    const events = await run(context, resolveCheckpoints)

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)

      expect(player.checkpoint).toBe(
        {
          player1: 0,
          player2: 1,
          player3: 1,
          player4: 2,
          player5: 1,
          player6: 2,
        }[playerId]
      )

      expect(player.checkpointDir).toBe(
        {
          player1: Direction.NORTH,
          player2: Direction.SOUTH,
          player3: Direction.SOUTH,
          player4: Direction.WEST,
          player5: Direction.WEST,
          player6: Direction.EAST,
        }[playerId]
      )
    }

    expect(context.state.over).toBe(false)

    expect(events).toStrictEqual([
      {
        code: "playerCheckpoint",
        players: {
          player4: {
            checkpoint: 2,
          },
        },
      },
    ])
  })
})
