import { Direction } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { RESPAWN_DAMAGE } from "../constants"
import { RoborallyContext } from "../context"

import { resolveTurnEnd } from "./resolveTurnEnd"

describe("resolveTurnEnd", () => {
  it("respawns destroyed players and activates power down", async () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      board: {
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
        },
      },
      players: {
        // Destroyed
        player1: {
          $merge: {
            checkpoint: 2,
            checkpointDir: Direction.EAST,
            damage: 1,
            destroyed: true,
            pos: {
              x: 2,
              y: 2,
            },
            powerDown: true,
            powerDownNext: true,
            program: [null, null, null, null, null],
            rot: Direction.NORTH,
          },
        },
        // Powered down
        player2: {
          $merge: {
            checkpoint: 2,
            checkpointDir: Direction.EAST,
            damage: 3,
            destroyed: false,
            pos: {
              x: 3,
              y: 3,
            },
            powerDown: true,
            powerDownNext: false,
            program: [1, 2, 3, 4, 5],
            rot: Direction.WEST,
          },
        },
        // Powered down next
        player3: {
          $merge: {
            checkpoint: 2,
            checkpointDir: Direction.EAST,
            damage: 8,
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            powerDown: false,
            powerDownNext: true,
            program: [1, 2, 3, 4, 5],
            rot: Direction.SOUTH,
          },
        },
        // Locked registers
        player4: {
          $merge: {
            checkpoint: 2,
            checkpointDir: Direction.EAST,
            damage: 7,
            destroyed: false,
            pos: {
              x: 5,
              y: 5,
            },
            powerDown: false,
            powerDownNext: false,
            program: [1, 2, 3, 4, 5],
            rot: Direction.WEST,
          },
        },
      },
    })

    const events = await run(context, resolveTurnEnd)

    expect(context.player("player1")).toMatchObject({
      checkpoint: 2,
      checkpointDir: Direction.EAST,
      damage: RESPAWN_DAMAGE,
      destroyed: false,
      pos: {
        x: 6,
        y: 6,
      },
      powerDown: false,
      powerDownNext: false,
      program: [null, null, null, null, null],
      rot: Direction.EAST,
    })

    expect(context.player("player2")).toMatchObject({
      checkpoint: 2,
      checkpointDir: Direction.EAST,
      damage: 0,
      destroyed: false,
      pos: {
        x: 3,
        y: 3,
      },
      powerDown: false,
      powerDownNext: false,
      program: [null, null, null, null, null],
      rot: Direction.WEST,
    })

    expect(context.player("player3")).toMatchObject({
      checkpoint: 2,
      checkpointDir: Direction.EAST,
      damage: 8,
      destroyed: false,
      pos: {
        x: 4,
        y: 4,
      },
      powerDown: true,
      powerDownNext: false,
      program: [null, null, null, null, null],
      rot: Direction.SOUTH,
    })

    expect(context.player("player4")).toMatchObject({
      checkpoint: 2,
      checkpointDir: Direction.EAST,
      damage: 7,
      destroyed: false,
      pos: {
        x: 5,
        y: 5,
      },
      powerDown: false,
      powerDownNext: false,
      program: [null, null, 3, 4, 5],
      rot: Direction.WEST,
    })

    expect(events).toStrictEqual([
      {
        code: "playerRespawn",
        players: {
          player1: {
            dir: Direction.EAST,
            pos: {
              x: 6,
              y: 6,
            },
          },
        },
      },
    ])
  })
})
