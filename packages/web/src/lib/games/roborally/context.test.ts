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
})
