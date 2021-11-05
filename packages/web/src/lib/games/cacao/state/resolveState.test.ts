import { createTestContext, resolve } from "lib/games/test/utils"

import { getInitialBoard } from "../board"
import { PLAYER_HAND_SIZE } from "../constants"
import { CacaoContext } from "../context"

describe("CacaoContext", () => {
  it("initializes game state for 2 players", async () => {
    const context = createTestContext(CacaoContext, 2)

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
    const context = createTestContext(CacaoContext, 3)

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
    const context = createTestContext(CacaoContext, 4)

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
    const context = createTestContext(CacaoContext, 3)

    const forestDeck = context.state.deck

    const events = await resolve(context, {})

    expect(events).toStrictEqual([
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
    ])

    expect(context.state.currentPlayerId).toBe(context.state.startingPlayerId)
    expect(context.state.deck).toStrictEqual(forestDeck.slice(2))
    expect(context.state.tiles).toStrictEqual(forestDeck.slice(0, 2))

    expect(context.player(context.state.startingPlayerId).ready).toBe(false)
  })
})
