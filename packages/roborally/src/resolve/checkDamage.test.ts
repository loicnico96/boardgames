import { createTestContext, run } from "../../test/utils"
import { MAX_DAMAGE } from "../constants"

import { checkDamage } from "./checkDamage"

describe("checkDamage", () => {
  it("destroys players with maximum damage", async () => {
    const context = await createTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            damage: 0,
          },
        },
        player2: {
          $merge: {
            damage: MAX_DAMAGE - 1,
          },
        },
        player3: {
          $merge: {
            damage: MAX_DAMAGE,
          },
        },
      },
    })

    const events = await run(context, checkDamage)

    expect(context.player("player1")).toMatchObject({
      destroyed: false,
    })

    expect(context.player("player2")).toMatchObject({
      destroyed: false,
    })

    expect(context.player("player3")).toMatchObject({
      destroyed: true,
    })

    expect(events).toStrictEqual([
      {
        code: "playerDestroy",
        players: {
          player3: {
            destroyed: true,
          },
        },
      },
    ])
  })
})
