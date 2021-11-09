import { Direction, Rotation } from "@boardgames/utils"

import { createTestContext, run } from "lib/games/test/utils"

import { CardAction, getCardAction } from "../card"
import { RoborallyContext } from "../context"

import { resolveProgramCard, resolveProgramCards } from "./resolveProgramCards"

describe("playerCard", () => {
  it("resolves Move 1", async () => {
    expect(getCardAction(63)).toBe(CardAction.MOVE_1)

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

    const events = await run(context, resolveProgramCard, "player1", 63)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 0,
      },
      rot: Direction.NORTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 63,
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
    expect(getCardAction(72)).toBe(CardAction.MOVE_2)

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

    const events = await run(context, resolveProgramCard, "player1", 72)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 3,
        y: 1,
      },
      rot: Direction.EAST,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 72,
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
    expect(getCardAction(81)).toBe(CardAction.MOVE_3)

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

    const events = await run(context, resolveProgramCard, "player1", 81)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 4,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 81,
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
    expect(getCardAction(81)).toBe(CardAction.MOVE_3)

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

    const events = await run(context, resolveProgramCard, "player1", 81)

    expect(context.player("player1")).toMatchObject({
      destroyed: true,
      pos: {
        x: -1,
        y: 1,
      },
      rot: Direction.WEST,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 81,
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

  it("moves 1 less space if moving from water", async () => {
    expect(getCardAction(81)).toBe(CardAction.MOVE_3)

    const context = createTestContext(RoborallyContext, 1)

    context.update({
      board: {
        $merge: {
          cells: {
            1: {
              1: {
                water: true,
              },
            },
          },
        },
      },
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

    const events = await run(context, resolveProgramCard, "player1", 81)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 3,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 81,
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

  it("moves through water normally", async () => {
    expect(getCardAction(81)).toBe(CardAction.MOVE_3)

    const context = createTestContext(RoborallyContext, 1)

    context.update({
      board: {
        $merge: {
          cells: {
            1: {
              2: {
                water: true,
              },
            },
          },
        },
      },
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

    const events = await run(context, resolveProgramCard, "player1", 81)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 4,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 81,
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

  it("teleports if moving from a teleporter", async () => {
    expect(getCardAction(81)).toBe(CardAction.MOVE_3)

    const context = createTestContext(RoborallyContext, 1)

    context.update({
      board: {
        $merge: {
          cells: {
            1: {
              1: {
                teleport: true,
                walls: [Direction.SOUTH],
              },
              2: {
                hole: true,
              },
            },
          },
        },
      },
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

    const events = await run(context, resolveProgramCard, "player1", 81)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 6,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 81,
      },
      {
        code: "playerTeleport",
        players: {
          player1: {
            pos: {
              x: 1,
              y: 6,
            },
          },
        },
      },
    ])
  })

  it("teleports backwards with Move Back", async () => {
    expect(getCardAction(45)).toBe(CardAction.MOVE_BACK)

    const context = createTestContext(RoborallyContext, 1)

    context.update({
      board: {
        $merge: {
          cells: {
            1: {
              1: {
                teleport: true,
                walls: [Direction.SOUTH],
              },
              2: {
                hole: true,
              },
            },
          },
        },
      },
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

    const events = await run(context, resolveProgramCard, "player1", 45)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 3,
      },
      rot: Direction.NORTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 45,
      },
      {
        code: "playerTeleport",
        players: {
          player1: {
            pos: {
              x: 1,
              y: 3,
            },
          },
        },
      },
    ])
  })

  it("does not teleport if the destination is occupied", async () => {
    expect(getCardAction(81)).toBe(CardAction.MOVE_3)

    const context = createTestContext(RoborallyContext, 2)

    context.update({
      board: {
        $merge: {
          cells: {
            1: {
              1: {
                teleport: true,
              },
            },
          },
        },
      },
      players: {
        player1: {
          $merge: {
            pos: {
              x: 1,
              y: 1,
            },
            rot: Direction.SOUTH,
            virtual: false,
          },
        },
        player2: {
          $merge: {
            pos: {
              x: 1,
              y: 6,
            },
            rot: Direction.SOUTH,
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveProgramCard, "player1", 81)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 4,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 81,
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

  it("moves through portal during Move 3", async () => {
    expect(getCardAction(81)).toBe(CardAction.MOVE_3)

    const context = createTestContext(RoborallyContext, 1)

    context.update({
      board: {
        $merge: {
          cells: {
            1: {
              2: {
                portal: {
                  pos: {
                    x: 6,
                    y: 7,
                  },
                },
              },
            },
            6: {
              7: {
                portal: {
                  pos: {
                    x: 1,
                    y: 2,
                  },
                },
              },
            },
          },
        },
      },
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

    const events = await run(context, resolveProgramCard, "player1", 81)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 6,
        y: 9,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 81,
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
        code: "playerTeleport",
        players: {
          player1: {
            pos: {
              x: 6,
              y: 7,
            },
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

  it("resolves Move Back", async () => {
    expect(getCardAction(45)).toBe(CardAction.MOVE_BACK)

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

    const events = await run(context, resolveProgramCard, "player1", 45)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 2,
        y: 1,
      },
      rot: Direction.WEST,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 45,
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
    expect(getCardAction(18)).toBe(CardAction.ROTATE_LEFT)

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

    const events = await run(context, resolveProgramCard, "player1", 18)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 1,
      },
      rot: Direction.NORTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 18,
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
    expect(getCardAction(15)).toBe(CardAction.ROTATE_RIGHT)

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

    const events = await run(context, resolveProgramCard, "player1", 15)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 1,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 15,
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
    expect(getCardAction(3)).toBe(CardAction.ROTATE_BACK)

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

    const events = await run(context, resolveProgramCard, "player1", 3)

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 1,
      },
      rot: Direction.WEST,
    })

    expect(events).toStrictEqual([
      {
        code: "playerCard",
        playerId: "player1",
        card: 3,
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
      $merge: {
        sequence: 2,
      },
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

    const events = await run(context, resolveProgramCards)

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
