import { createTestContext, run } from "../../test/utils"

import { resolveRepairs } from "./resolveRepairs"

describe("resolveRepairs", () => {
  it("repairs damaged players", async () => {
    const context = await createTestContext(4)

    context.update({
      board: {
        $merge: {
          cells: {
            3: {
              3: {
                repair: true,
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

    expect(context.player("player1")).toMatchObject({
      damage: 2,
    })

    expect(context.player("player2")).toMatchObject({
      damage: 1,
    })

    expect(context.player("player3")).toMatchObject({
      damage: 0,
    })

    expect(context.player("player4")).toMatchObject({
      damage: 2,
    })

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
