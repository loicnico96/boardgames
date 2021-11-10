import { run } from "lib/games/test/utils"

import { MAX_HAND_SIZE } from "../constants"
import { GamePhase } from "../model"

import { startTurn } from "./startTurn"
import { createRoborallyTestContext } from "./test/utils"

describe("startTurn", () => {
  it("deals cards and starts Program phase", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        // Undamaged
        player1: {
          $merge: {
            damage: 0,
            hand: [],
            powerDown: false,
            ready: true,
          },
        },
        // Damaged
        player2: {
          $merge: {
            damage: 3,
            hand: [],
            powerDown: false,
            ready: true,
          },
        },
        // Powered down
        player3: {
          $merge: {
            damage: 0,
            hand: [],
            powerDown: true,
            ready: true,
          },
        },
      },
    })

    const events = await run(context, startTurn)

    expect(context.state.phase).toBe(GamePhase.PROGRAM)

    expect(context.player("player1").hand).toHaveLength(MAX_HAND_SIZE)
    expect(context.player("player2").hand).toHaveLength(MAX_HAND_SIZE - 3)
    expect(context.player("player3").hand).toHaveLength(0)

    for (const playerId of context.state.playerOrder) {
      expect(context.player(playerId).ready).toBe(false)
    }

    expect(events).toStrictEqual([
      {
        code: "nextPhase",
        phase: GamePhase.PROGRAM,
      },
    ])
  })
})
