import { fill, generate } from "@boardgames/utils"

import { getInitialBoard } from "../board"
import { PLAYER_HAND_SIZE } from "../constants"
import { CacaoContext } from "../context"
import { CacaoAction, CacaoEvent, CacaoOptions } from "../model"

function createContext(
  playerCount: number,
  options?: CacaoOptions,
  seed: number = 0
): CacaoContext {
  const playerOrder = fill(playerCount, index => `player${index}`)

  const context = new CacaoContext()

  context.initState(
    playerOrder,
    generate(playerOrder, playerId => [playerId, { name: playerId }]),
    options ?? context.getDefaultOptions(),
    seed
  )

  return context
}

async function next(
  context: CacaoContext,
  options: {
    actions?: Record<string, CacaoAction>
    events?: CacaoEvent[]
  } = {}
): Promise<CacaoContext> {
  const events: CacaoEvent[] = []

  if (options.actions) {
    for (const playerId in options.actions) {
      context.validateAction(playerId, options.actions[playerId])
      context.setAction(playerId, options.actions[playerId])
    }
  }

  await context.resolve(async (_, event) => {
    events.push(event)
  })

  if (options.events) {
    expect(events).toStrictEqual(options.events)
  }

  return context
}

describe("CacaoContext", () => {
  it("initializes game state for 2 players", async () => {
    const context = createContext(2)

    expect(context.state.board).toStrictEqual(getInitialBoard())
    expect(context.state.currentPlayerId).toBe(null)
    expect(context.state.deck).toHaveLength(19)
    expect(context.state.playerOrder).toHaveLength(2)
    expect(context.state.tiles).toStrictEqual([null, null])

    for (const playerId of context.state.playerOrder) {
      const player = context.state.players[playerId]
      expect(player.beans).toBe(0)
      expect(player.chocolate).toBe(0)
      expect(player.coins).toBe(0)
      expect(player.deck).toHaveLength(11 - PLAYER_HAND_SIZE)
      expect(player.hand).toHaveLength(PLAYER_HAND_SIZE)
      expect(player.sun).toBe(0)
      expect(player.water).toBe(0)
    }
  })

  it("initializes game state for 3 players", async () => {
    const context = createContext(3)

    expect(context.state.board).toStrictEqual(getInitialBoard())
    expect(context.state.currentPlayerId).toBe(null)
    expect(context.state.deck).toHaveLength(26)
    expect(context.state.playerOrder).toHaveLength(3)
    expect(context.state.tiles).toStrictEqual([null, null])

    for (const playerId of context.state.playerOrder) {
      const player = context.state.players[playerId]
      expect(player.beans).toBe(0)
      expect(player.chocolate).toBe(0)
      expect(player.coins).toBe(0)
      expect(player.deck).toHaveLength(10 - PLAYER_HAND_SIZE)
      expect(player.hand).toHaveLength(PLAYER_HAND_SIZE)
      expect(player.sun).toBe(0)
      expect(player.water).toBe(0)
    }
  })

  it("initializes game state for 4 players", async () => {
    const context = createContext(4)

    expect(context.state.board).toStrictEqual(getInitialBoard())
    expect(context.state.currentPlayerId).toBe(null)
    expect(context.state.deck).toHaveLength(26)
    expect(context.state.playerOrder).toHaveLength(4)
    expect(context.state.tiles).toStrictEqual([null, null])

    for (const playerId of context.state.playerOrder) {
      const player = context.state.players[playerId]
      expect(player.beans).toBe(0)
      expect(player.chocolate).toBe(0)
      expect(player.coins).toBe(0)
      expect(player.deck).toHaveLength(9 - PLAYER_HAND_SIZE)
      expect(player.hand).toHaveLength(PLAYER_HAND_SIZE)
      expect(player.sun).toBe(0)
      expect(player.water).toBe(0)
    }
  })

  it("fills the Forest display and assigns the starting player", async () => {
    const context = createContext(3)

    const forestDeck = context.state.deck

    await next(context, {
      events: [
        {
          code: "refillForest",
          index: 0,
          type: forestDeck[0],
        },
        {
          code: "refillForest",
          index: 1,
          type: forestDeck[1],
        },
        {
          code: "nextPlayer",
          playerId: context.state.startingPlayerId,
        },
      ],
    })

    expect(context.state.currentPlayerId).toBe(context.state.startingPlayerId)
    expect(context.state.deck).toStrictEqual(forestDeck.slice(2))
    expect(context.state.tiles).toStrictEqual(forestDeck.slice(0, 2))

    expect(context.player(context.state.startingPlayerId).ready).toBe(false)
  })
})
