import { GameSettings } from "../GameSettings"
import { GameType } from "../GameType"

import { getInitialGameState } from "./getInitialGameState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const MetropolysSettings: GameSettings<GameType.METROPOLYS> = {
  defaultOptions: {},
  minPlayers: 2,
  maxPlayers: 4,

  getInitialGameState,

  async resolvePlayerAction(gameState, playerId, action) {
    // const ctx = new MetropolysContext(gameState)
    // await ctx.resolve(resolvePlayerAction, playerId, action)
    return gameState // ctx.getState()
  },

  async resolveState(gameState, onStateChanged) {
    // const ctx = new MetropolysContext(gameState, onStateChanged)
    // await ctx.resolve(resolveState)
    return gameState // ctx.getState()
  },

  validateAction,
  validateOptions,
}
