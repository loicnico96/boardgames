import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { CardAction, getCardAction } from "../card"
import { RoborallyContext } from "../context"

import { resolveProgramCard, resolveProgramCards } from "./resolveProgramCards"

describe("playerCard", () => {
  it("resolves Move 1", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.NORTH,
          },
        },
      },
    })

    const card = 63

    expect(getCardAction(card)).toBe(CardAction.MOVE_1)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 1, y: 0 })
    expect(player.rot).toBe(Direction.NORTH)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.NORTH,
          },
        },
      },
    ])
  })

  it("resolves Move 2", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.EAST,
          },
        },
      },
    })

    const card = 72

    expect(getCardAction(card)).toBe(CardAction.MOVE_2)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 3, y: 1 })
    expect(player.rot).toBe(Direction.EAST)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
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
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.EAST,
          },
        },
      },
    ])
  })

  it("resolves Move 3", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.SOUTH,
          },
        },
      },
    })

    const card = 81

    expect(getCardAction(card)).toBe(CardAction.MOVE_3)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 1, y: 4 })
    expect(player.rot).toBe(Direction.SOUTH)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
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
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.SOUTH,
          },
        },
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.SOUTH,
          },
        },
      },
    ])
  })

  it("destroys the player immediately upon moving into a hole", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.WEST,
          },
        },
      },
    })

    const card = 81

    expect(getCardAction(card)).toBe(CardAction.MOVE_3)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.destroyed).toBe(true)
    expect(player.pos).toStrictEqual({ x: -1, y: 1 })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
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
        code: "playerDestroy",
        players: {
          player1: {
            destroyed: true,
          },
        },
      },
    ])
  })

  it("resolves Move Back", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.WEST,
          },
        },
      },
    })

    const card = 45

    expect(getCardAction(card)).toBe(CardAction.MOVE_BACK)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 2, y: 1 })
    expect(player.rot).toBe(Direction.WEST)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.EAST,
          },
        },
      },
    ])
  })

  it("resolves Rotate Left", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.EAST,
          },
        },
      },
    })

    const card = 18

    expect(getCardAction(card)).toBe(CardAction.ROTATE_LEFT)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 1, y: 1 })
    expect(player.rot).toBe(Direction.NORTH)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            rot: Rotation.LEFT,
          },
        },
      },
    ])
  })

  it("resolves Rotate Right", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.EAST,
          },
        },
      },
    })

    const card = 15

    expect(getCardAction(card)).toBe(CardAction.ROTATE_RIGHT)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 1, y: 1 })
    expect(player.rot).toBe(Direction.SOUTH)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            rot: Rotation.RIGHT,
          },
        },
      },
    ])
  })

  it("resolves U-Turn", async () => {
    const context = createTestContext(RoborallyContext, 1)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.EAST,
          },
        },
      },
    })

    const card = 3

    expect(getCardAction(card)).toBe(CardAction.ROTATE_BACK)

    const events = await run(context, resolveProgramCard, "player1", card)

    const player = context.player("player1")

    expect(player.pos).toStrictEqual({ x: 1, y: 1 })
    expect(player.rot).toBe(Direction.WEST)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card,
      },
      {
        code: "playerMove",
        players: {
          player1: {
            rot: Rotation.RIGHT * 2,
          },
        },
      },
    ])
  })
})

describe("resolveProgramCards", () => {
  it("resolves all program cards in priority order", async () => {
    const context = createTestContext(RoborallyContext, 4)

    context.update({
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            program: [10, 66, 53, 37, 19],
            rot: Direction.NORTH,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
            program: [17, 38, 75, 26, 14],
            rot: Direction.EAST,
          },
        },
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
            program: [34, 52, 35, 48, 41],
            rot: Direction.SOUTH,
          },
        },
        player4: {
          $merge: {
            pos: {
              x: 4,
              y: 4,
            },
            program: [23, 12, 54, 60, 6],
            rot: Direction.WEST,
          },
        },
      },
    })

    const events = await run(context, resolveProgramCards, 2)

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player2",
        card: 75,
      },
      {
        code: "playerMove",
        players: {
          player2: {
            dir: Direction.EAST,
          },
        },
      },
      {
        code: "playerMove",
        players: {
          player2: {
            dir: Direction.EAST,
          },
        },
      },
      {
        code: "playerCard",
        playerId: "player4",
        card: 54,
      },
      {
        code: "playerMove",
        players: {
          player4: {
            dir: Direction.WEST,
          },
        },
      },
      {
        code: "playerCard",
        playerId: "player1",
        card: 53,
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
        code: "playerCard",
        playerId: "player3",
        card: 35,
      },
      {
        code: "playerMove",
        players: {
          player3: {
            rot: Rotation.RIGHT,
          },
        },
      },
    ])
  })
})
