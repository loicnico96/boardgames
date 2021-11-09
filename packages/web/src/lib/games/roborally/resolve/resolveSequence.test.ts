import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"
import { BoardFeature, GamePhase } from "../model"

import { resolveSequence } from "./resolveSequence"

describe("resolveSequence", () => {
  it("resolves programs and board elements in order", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      board: {
        $merge: {
          cells: {
            2: {
              1: {
                conveyor: {
                  dir: Direction.SOUTH,
                  fast: true,
                },
              },
              2: {
                conveyor: {
                  dir: Direction.EAST,
                  fast: true,
                },
              },
            },
            3: {
              2: {
                gear: {
                  rot: Rotation.RIGHT,
                },
              },
            },
          },
          features: Object.values(BoardFeature),
        },
      },
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            program: [26, 63, 33, 34, 78],
            rot: Direction.EAST,
          },
        },
      },
    })

    const events = await run(context, resolveSequence, 1)

    expect(context.state.sequence).toBe(1)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 3, y: 2 })
    expect(player.rot).toBe(Direction.SOUTH)

    expect(events).toStrictEqual([
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_TRAP,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_PROGRAM,
      },
      {
        code: "playerCard",
        playerId: "player1",
        card: 63,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.EAST,
          },
        },
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CONVEYOR_FAST,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.SOUTH,
          },
        },
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CONVEYOR,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.EAST,
          },
        },
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_PUSHER,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CRUSHER,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_GEAR,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            rot: Rotation.RIGHT,
          },
        },
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_REPAIR,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CHECKPOINT,
      },
    ])
  })
})
