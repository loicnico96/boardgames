import { Direction, fill } from "@boardgames/utils"

import { MAX_HAND_SIZE, SEQUENCE_COUNT } from "./constants"
import { RoborallyContext } from "./context"
import { GamePhase, RoborallyAction } from "./model"

describe("RoborallyContext", () => {
  it("starts a new game in Ready phase", async () => {
    const context = new RoborallyContext()

    context.initState(
      ["player1", "player2", "player3"],
      {
        player1: {
          name: "Player 1",
        },
        player2: {
          name: "Player 2",
        },
        player3: {
          name: "Player 3",
        },
      },
      context.getDefaultOptions(),
      0
    )

    await context.resolve()

    expect(context.state.phase).toBe(GamePhase.READY)
    expect(context.state.playerOrder).toHaveLength(3)
    expect(context.state.turn).toBe(0)

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)
      expect(player.active).toBe(true)
      expect(player.checkpoint).toBe(0)
      expect(player.damage).toBe(0)
      expect(player.dir).toBe(Direction.NORTH)
      expect(player.hand).toHaveLength(0)
      expect(player.pos).toStrictEqual(context.state.checkpoints[0])
      expect(player.powerDown).toBe(false)
      expect(player.program).toStrictEqual(fill(SEQUENCE_COUNT, null))
      expect(player.ready).toBe(false)
      expect(player.virtual).toBe(true)
    }

    const action: RoborallyAction = { code: "ready" }

    context.validateAction("player1", action)
    context.setAction("player1", action)

    await context.resolve()

    expect(context.state.phase).toBe(GamePhase.READY)

    context.validateAction("player2", action)
    context.setAction("player2", action)

    await context.resolve()

    expect(context.state.phase).toBe(GamePhase.READY)

    context.validateAction("player3", action)
    context.setAction("player3", action)

    await context.resolve()

    expect(context.state.phase).toBe(GamePhase.PROGRAM)

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)
      expect(player.hand).toHaveLength(MAX_HAND_SIZE)
      expect(player.powerDown).toBe(false)
      expect(player.program).toStrictEqual(fill(SEQUENCE_COUNT, null))
      expect(player.ready).toBe(false)
    }
  })

  it("validates actions", () => {
    const context = new RoborallyContext()

    context.initState(
      ["player1", "player2", "player3"],
      {
        player1: {
          name: "Player 1",
        },
        player2: {
          name: "Player 2",
        },
        player3: {
          name: "Player 3",
        },
      },
      context.getDefaultOptions(),
      0
    )

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

    context.state.phase = GamePhase.PROGRAM
    context.state.players.player1.hand = [1, 2, 3, 4, 5, 6, 7, 8]

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

    context.state.players.player1.powerDown = true

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

    context.state.players.player1.powerDown = false
    context.state.players.player1.program = [null, null, null, 7, 8]

    expect(() =>
      context.validateAction("player1", {
        code: "program",
        powerDown: true,
        program: [1, 2, 3, 6, 8],
      })
    ).toThrow(/locked/i)

    context.validateAction("player1", {
      code: "program",
      powerDown: true,
      program: [1, 2, 3, 7, 8],
    })
  })
})
