import { Direction, Rotation } from "@boardgames/utils"

import { run } from "lib/games/test/utils"

import { resolveMoves } from "./resolveMoves"
import { createRoborallyTestContext } from "./test/utils"

describe("resolveMoves", () => {
  it("moves players", async () => {
    const context = await createRoborallyTestContext(4)

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
        player2: {
          $merge: {
            pos: {
              x: 2,
              y: 2,
            },
            rot: Direction.EAST,
          },
        },
        player3: {
          $merge: {
            pos: {
              x: 3,
              y: 3,
            },
            rot: Direction.SOUTH,
          },
        },
        player4: {
          $merge: {
            pos: {
              x: 4,
              y: 4,
            },
            rot: Direction.WEST,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player2: {
        dir: Direction.NORTH,
      },
      player3: {
        rot: Rotation.RIGHT,
      },
      player4: {
        dir: Direction.EAST,
        rot: Rotation.LEFT,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 1,
        y: 1,
      },
      rot: Direction.NORTH,
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 2,
        y: 1,
      },
      rot: Direction.EAST,
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 3,
        y: 3,
      },
      rot: Direction.WEST,
    })

    expect(context.player("player4")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
      rot: Direction.SOUTH,
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player2: {
            dir: Direction.NORTH,
          },
          player3: {
            rot: Rotation.RIGHT,
          },
          player4: {
            dir: Direction.EAST,
            rot: Rotation.LEFT,
          },
        },
      },
    ])
  })

  it("cannot move through walls", async () => {
    const context = await createRoborallyTestContext(2, {
      cells: {
        4: {
          4: {
            walls: [Direction.NORTH],
          },
        },
        6: {
          5: {
            walls: [Direction.SOUTH],
          },
        },
      },
    })

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 6,
              y: 6,
            },
            virtual: true,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.NORTH,
      },
      player2: {
        dir: Direction.NORTH,
      },
    })

    expect(context.player("player1").pos).toStrictEqual({ x: 4, y: 4 })
    expect(context.player("player2").pos).toStrictEqual({ x: 6, y: 6 })

    expect(events).toStrictEqual([])
  })

  it("can push other players if move is marked as such", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 6,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 6,
        y: 4,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 7,
        y: 4,
      },
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.EAST,
          },
          player2: {
            dir: Direction.EAST,
          },
          player3: {
            dir: Direction.EAST,
          },
        },
      },
    ])
  })

  it("cannot push other players if move is not marked as such", async () => {
    const context = await createRoborallyTestContext(2)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(events).toStrictEqual([])
  })

  it("cannot push other players through walls", async () => {
    const context = await createRoborallyTestContext(3, {
      cells: {
        6: {
          4: {
            walls: [Direction.EAST],
          },
        },
      },
    })

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 6,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 6,
        y: 4,
      },
    })

    expect(events).toStrictEqual([])
  })

  it("ignores collisions if virtual", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: true,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 6,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 6,
        y: 4,
      },
    })

    expect(events).toStrictEqual([
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

  it("ignores collisions with virtual players", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 6,
              y: 4,
            },
            virtual: true,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 6,
        y: 4,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 6,
        y: 4,
      },
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.EAST,
          },
          player2: {
            dir: Direction.EAST,
          },
        },
      },
    ])
  })

  it("ignores collisions with destroyed players", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: true,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 6,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 6,
        y: 4,
      },
    })

    expect(events).toStrictEqual([
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

  it("cannot move several players to the same location", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 5,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 6,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
      },
      player3: {
        dir: Direction.NORTH,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 5,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 5,
        y: 6,
      },
    })

    expect(events).toStrictEqual([])
  })

  it("cannot push a player in several directions", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 5,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
        push: true,
      },
      player2: {
        dir: Direction.NORTH,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 5,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(events).toStrictEqual([])
  })

  it("can move to the location of another moving player", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 5,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 6,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.SOUTH,
      },
      player2: {
        dir: Direction.SOUTH,
      },
      player3: {
        dir: Direction.EAST,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 5,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 4,
        y: 6,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 5,
        y: 6,
      },
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player1: {
            dir: Direction.SOUTH,
          },
          player2: {
            dir: Direction.SOUTH,
          },
          player3: {
            dir: Direction.EAST,
          },
        },
      },
    ])
  })

  it("cannot swap location with another player", async () => {
    const context = await createRoborallyTestContext(2)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 5,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.SOUTH,
      },
      player2: {
        dir: Direction.NORTH,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 4,
        y: 5,
      },
    })

    expect(events).toStrictEqual([])
  })

  it("resolves walls before player collisions", async () => {
    const context = await createRoborallyTestContext(3, {
      cells: {
        5: {
          4: {
            walls: [Direction.EAST],
          },
        },
      },
    })

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 5,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
        push: true,
      },
      player2: {
        dir: Direction.NORTH,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 5,
        y: 3,
      },
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player2: {
            dir: Direction.NORTH,
          },
          player3: {
            dir: Direction.NORTH,
          },
        },
      },
    ])
  })

  it("gives priority to pushing moves", async () => {
    const context = await createRoborallyTestContext(3)

    context.update({
      players: {
        player1: {
          $merge: {
            destroyed: false,
            pos: {
              x: 4,
              y: 4,
            },
            virtual: false,
          },
        },
        player2: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 5,
            },
            virtual: false,
          },
        },
        player3: {
          $merge: {
            destroyed: false,
            pos: {
              x: 5,
              y: 4,
            },
            virtual: false,
          },
        },
      },
    })

    const events = await run(context, resolveMoves, {
      player1: {
        dir: Direction.EAST,
      },
      player2: {
        dir: Direction.NORTH,
        push: true,
      },
    })

    expect(context.player("player1")).toMatchObject({
      pos: {
        x: 4,
        y: 4,
      },
    })

    expect(context.player("player2")).toMatchObject({
      pos: {
        x: 5,
        y: 4,
      },
    })

    expect(context.player("player3")).toMatchObject({
      pos: {
        x: 5,
        y: 3,
      },
    })

    expect(events).toStrictEqual([
      {
        code: "playerMove",
        players: {
          player2: {
            dir: Direction.NORTH,
          },
          player3: {
            dir: Direction.NORTH,
          },
        },
      },
    ])
  })
})
