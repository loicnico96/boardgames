import { createTestContext, run } from "lib/games/test/utils"

import { RoborallyContext } from "../context"
import { CellType } from "../model"

import { resolveRepairs } from "./resolveRepairs"

describe("resolveRepairs", () => {
  it("repairs damaged players", async () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      board: {
        cells: {
          $set: {
            3: {
              3: {
                type: CellType.REPAIR,
              },
            },
          },
        },
      },
      players: {
        // Not on repair site, will not be repaired
        player1: {
          $merge: {
            damage: 2,
            pos: {
              x: 2,
              y: 2,
            },
          },
        },
        // Damaged, will be repaired
        player2: {
          $merge: {
            damage: 2,
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
        // Not damaged, will not be repaired
        player3: {
          $merge: {
            damage: 0,
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
        // Destroyed, will not be repaired
        player4: {
          $merge: {
            damage: 2,
            destroyed: true,
            pos: {
              x: 3,
              y: 3,
            },
          },
        },
      },
    })

    const events = await run(context, resolveRepairs)

    for (const playerId of context.state.playerOrder) {
      const player = context.player(playerId)

      expect(player.damage).toBe(
        {
          player1: 2,
          player2: 1,
          player3: 0,
          player4: 2,
        }[playerId]
      )
    }

    expect(context.state.over).toBe(false)

    expect(events).toStrictEqual([
      {
        code: "playerRepair",
        players: {
          player2: {
            repair: 1,
          },
        },
      },
    ])
  })
})
