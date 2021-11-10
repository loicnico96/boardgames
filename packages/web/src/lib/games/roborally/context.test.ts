import { fill } from "@boardgames/utils"

import { createTestContext, resolve } from "../test/utils"

import { SEQUENCE_COUNT } from "./constants"
import { RoborallyContext } from "./context"
import { GamePhase } from "./model"

describe("RoborallyContext", () => {
  it("starts a new game in Ready phase", async () => {
    const context = createTestContext(RoborallyContext, 4)

    await resolve(context, {})

    expect(context.state.phase).toBe(GamePhase.READY)
    expect(context.state.playerOrder).toHaveLength(4)
    expect(context.state.turn).toBe(0)

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)
      expect(player.checkpoint).toBe(0)
      expect(player.damage).toBe(0)
      expect(player.destroyed).toBe(false)
      expect(player.hand).toHaveLength(0)
      expect(player.pos).toStrictEqual(context.state.board.checkpoints[0])
      expect(player.powerDown).toBe(false)
      expect(player.program).toStrictEqual(fill(SEQUENCE_COUNT, null))
      expect(player.ready).toBe(false)
      expect(player.rot).toBe(0)
      expect(player.virtual).toBe(true)
    }
  })

  it("validates Ready action", () => {
    const context = createTestContext(RoborallyContext, 4)

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
        program: [1, 2, 3, 4, 5],
      })
    ).toThrow(/not available/i)

    context.validateAction("player1", {
      code: "ready",
    })
  })

  it("validates Program action when powered up", () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      $merge: {
        phase: GamePhase.PROGRAM,
      },
      players: {
        player1: {
          $merge: {
            hand: [1, 2, 3, 4, 5, 6, 7, 8],
            powerDown: false,
            program: [null, null, null, null, null],
          },
        },
      },
    })

    expect(() =>
      context.validateAction("player1", {
        code: "ready",
      })
    ).toThrow(/not available/i)

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
      })
    ).toThrow(/missing/i)

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
        program: [1, 2, 3, 4],
      })
    ).toThrow(/contain 5 cards/i)

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
        program: [1, 2, 3, 4, null],
      })
    ).toThrow(/empty/i)

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
        program: [1, 2, 3, 4, 1000],
      })
    ).toThrow(/invalid/i)

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
        program: [1, 2, 3, 4, 4],
      })
    ).toThrow(/duplicate/i)

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
        program: [1, 2, 3, 4, 0],
      })
    ).toThrow(/not in your hand/i)

    context.validateAction("player1", {
      code: "program",
      powerDown: false,
      program: [1, 2, 3, 4, 5],
    })
  })

  it("validates Program action when powered down", () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      $merge: {
        phase: GamePhase.PROGRAM,
      },
      players: {
        player1: {
          $merge: {
            hand: [],
            powerDown: true,
            program: [null, null, null, null, null],
          },
        },
      },
    })

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: false,
        program: [1, 2, 3, 6, 8],
      })
    ).toThrow(/powered down/i)

    context.validateAction("player1", {
      code: "program",
      powerDown: false,
      program: [null, null, null, null, null],
    })
  })

  it("validates Program action with locked registers", () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      $merge: {
        phase: GamePhase.PROGRAM,
      },
      players: {
        player1: {
          $merge: {
            hand: [1, 2, 3, 4, 5, 6],
            powerDown: false,
            program: [null, null, null, 7, 8],
          },
        },
      },
    })

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: true,
        program: [1, 2, 3, 4, 8],
      })
    ).toThrow(/locked/i)

    context.validateAction("player1", {
      code: "program",
      powerDown: true,
      program: [1, 2, 3, 7, 8],
    })
  })
})
