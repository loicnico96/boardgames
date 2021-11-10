import { fill, generate } from "@boardgames/utils"

import { Constructor, GameContext } from "../context"

export const TEST_SEED = 0

export async function createTestContext<C extends GameContext<any>>(
  constructor: Constructor<C>,
  playerCount: number,
  options?: ReturnType<C["validateOptions"]>,
  fetchResults?: Record<string, any>
): Promise<C> {
  const context = new constructor()

  const playerOrder = fill(playerCount, index => `player${index + 1}`)

  const fetcher = async <T>(ref: string) => {
    const fetchResult = fetchResults?.[ref] ?? null

    if (!fetchResult) {
      throw Error(`Not found: ${ref}`)
    }

    return fetchResult as T
  }

  await context.initState(
    playerOrder,
    generate(playerOrder, playerId => [playerId, { name: playerId }]),
    options ? context.validateOptions(options) : context.getDefaultOptions(),
    TEST_SEED,
    fetcher
  )

  return context
}

export async function run<C extends GameContext<any>, P extends any[]>(
  context: C,
  fn: (context: C, ...args: P) => Promise<void>,
  ...fnArgs: P
): Promise<Parameters<Parameters<C["onStateChange"]>[0]>[1][]> {
  const events: Parameters<Parameters<C["onStateChange"]>[0]>[1][] = []

  context.onStateChange(async (_, event) => {
    events.push(event)
  })

  await fn(context, ...fnArgs)

  return events
}

export async function resolve<C extends GameContext<any>>(
  context: C,
  actions: Record<string, ReturnType<C["validateAction"]>>
): Promise<Parameters<Parameters<C["onStateChange"]>[0]>[1][]> {
  for (const playerId in actions) {
    context.validateAction(playerId, actions[playerId])
    context.setAction(playerId, actions[playerId])
  }

  return run(context, ctx => ctx.resolve())
}
