import { fill, generate } from "@boardgames/utils"

import { RoborallyContext } from "../src/context"
import {
  BoardId,
  RoborallyAction,
  RoborallyBoard,
  RoborallyEvent,
} from "../src/model"

const TEST_BOARD: RoborallyBoard = {
  cells: {},
  checkpoints: [
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
    {
      x: 4,
      y: 4,
    },
    {
      x: 5,
      y: 5,
    },
    {
      x: 6,
      y: 6,
    },
  ],
  dimensions: {
    x: 12,
    y: 12,
  },
  features: [],
}

export const TEST_SEED = 0

export async function createTestContext(
  playerCount: number,
  board?: Partial<RoborallyBoard>
): Promise<RoborallyContext> {
  const context = new RoborallyContext()

  const playerOrder = fill(playerCount, index => `player${index + 1}`)

  await context.initState(
    playerOrder,
    generate(playerOrder, playerId => [playerId, { name: playerId }]),
    {
      boardId: "test" as BoardId,
      checkpoints: (board?.checkpoints ?? TEST_BOARD.checkpoints).length - 1,
    },
    TEST_SEED,
    async (ref: string): Promise<any> => {
      if (ref === "games/roborally/boards/test") {
        return {
          ...TEST_BOARD,
          ...board,
        }
      }

      throw Error("Not found")
    }
  )

  return context
}

export async function run<P extends any[]>(
  context: RoborallyContext,
  fn: (context: RoborallyContext, ...args: P) => Promise<unknown>,
  ...fnArgs: P
): Promise<RoborallyEvent[]> {
  const events: RoborallyEvent[] = []

  context.onStateChange(async (_, event) => {
    events.push(event)
  })

  await fn(context, ...fnArgs)

  return events
}

export async function resolve(
  context: RoborallyContext,
  actions: Record<string, RoborallyAction>
): Promise<RoborallyEvent[]> {
  for (const playerId in actions) {
    context.validateAction(playerId, actions[playerId])
    context.setAction(playerId, actions[playerId])
  }

  return run(context, ctx => ctx.resolve())
}
