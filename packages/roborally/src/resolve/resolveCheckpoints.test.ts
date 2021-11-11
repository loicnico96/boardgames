import { Direction } from "@boardgames/utils"

import { createTestContext, run } from "../../test/utils"

import { resolveCheckpoints } from "./resolveCheckpoints"

describe("resolveCheckpoints", () => {
  it("registers reached checkpoints", async () => {
    const context = await createTestContext(6, {
      checkpoints: [
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
    })

    context.update({
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
            pos: context.state.board.checkpoints[0],
            rot: Direction.EAST,
          },
        },
        // On current checkpoint, but different direction
        player3: {
          $merge: {
            checkpoint: 1,
            checkpointDir: Direction.NORTH,
            pos: context.state.board.checkpoints[1],
            rot: Direction.SOUTH,
          },
        },
        // On next checkpoint
        player4: {
          $merge: {
            checkpoint: 1,
            checkpointDir: Direction.SOUTH,
            pos: context.state.board.checkpoints[2],
            rot: Direction.WEST,
          },
        },
        // On another checkpoint
        player5: {
          $merge: {
            checkpoint: 1,
            checkpointDir: Direction.WEST,
            pos: context.state.board.checkpoints[3],
            rot: Direction.EAST,
          },
        },
        // Destroyed
        player6: {
          $merge: {
            checkpoint: 2,
            checkpointDir: Direction.EAST,
            destroyed: true,
            pos: context.state.board.checkpoints[3],
            rot: Direction.SOUTH,
          },
        },
      },
    })

    const events = await run(context, resolveCheckpoints)

    expect(context.player("player1")).toMatchObject({
      checkpoint: 0,
      checkpointDir: Direction.NORTH,
    })

    expect(context.player("player2")).toMatchObject({
      checkpoint: 1,
      checkpointDir: Direction.SOUTH,
    })

    expect(context.player("player3")).toMatchObject({
      checkpoint: 1,
      checkpointDir: Direction.SOUTH,
    })

    expect(context.player("player4")).toMatchObject({
      checkpoint: 2,
      checkpointDir: Direction.WEST,
    })

    expect(context.player("player5")).toMatchObject({
      checkpoint: 1,
      checkpointDir: Direction.WEST,
    })

    expect(context.player("player6")).toMatchObject({
      checkpoint: 2,
      checkpointDir: Direction.EAST,
    })

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
