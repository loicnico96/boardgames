import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"
import { BoardFeature, GamePhase } from "../model"

import { resolveTurn } from "./resolveTurn"

describe("resolveTurn", () => {
  it("resolves an entire turn", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      $merge: {
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
        phase: GamePhase.PROGRAM,
      },
      board: {
        $merge: {
          cells: {
            4: {
              2: {
                gear: {
                  rot: Rotation.RIGHT,
                },
              },
              3: {
                repair: true,
              },
            },
          },
          features: [BoardFeature.GEAR, BoardFeature.REPAIR],
        },
      },
      players: {
        player1: {
          $merge: {
            action: {
              code: "program",
              powerDown: true,
              program: [25, 60, 17, 46, 78],
            },
            checkpoint: 1,
            checkpointDir: Direction.NORTH,
            damage: 3,
            destroyed: false,
            hand: [13, 17, 60, 38, 78, 25, 46],
            pos: {
              x: 3,
              y: 3,
            },
            powerDown: false,
            program: [null, null, null, null, null],
            ready: true,
            rot: Direction.NORTH,
          },
        },
      },
    })

    const events = await run(context, resolveTurn)

    expect(context.state.phase).toBe(GamePhase.READY)

    expect(context.player("player1")).toMatchObject({
      action: null,
      checkpoint: 1,
      checkpointDir: Direction.EAST,
      damage: 1,
      destroyed: false,
      hand: [],
      pos: {
        x: 1,
        y: 2,
      },
      powerDown: true,
      program: [null, null, null, null, null],
      ready: false,
      rot: Direction.WEST,
    })

    expect(events).toStrictEqual([
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_PROGRAM,
      },
      {
        code: "playerCard",
        playerId: "player1",
        card: 25,
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
        phase: GamePhase.RESOLVE_GEAR,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_REPAIR,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CHECKPOINT,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_PROGRAM,
      },
      {
        code: "playerCard",
        playerId: "player1",
        card: 60,
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
        phase: GamePhase.RESOLVE_GEAR,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_REPAIR,
      },
      {
        code: "playerRepair",
        players: {
          player1: {
            repair: 1,
          },
        },
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CHECKPOINT,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_PROGRAM,
      },
      {
        code: "playerCard",
        playerId: "player1",
        card: 17,
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
        phase: GamePhase.RESOLVE_GEAR,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_REPAIR,
      },
      {
        code: "playerRepair",
        players: {
          player1: {
            repair: 1,
          },
        },
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CHECKPOINT,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_PROGRAM,
      },
      {
        code: "playerCard",
        playerId: "player1",
        card: 46,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.NORTH,
          },
        },
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
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_PROGRAM,
      },
      {
        code: "playerCard",
        playerId: "player1",
        card: 78,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.WEST,
          },
        },
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.WEST,
          },
        },
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.WEST,
          },
        },
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_GEAR,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_REPAIR,
      },
      {
        code: "nextPhase",
        phase: GamePhase.RESOLVE_CHECKPOINT,
      },
      {
        code: "nextPhase",
        phase: GamePhase.READY,
      },
    ])
  })
})
