import { GameSettings } from "../GameSettings"
import { GameType } from "../GameType"

import { getInitialGameState } from "./getInitialGameState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const RoborallySettings: GameSettings<GameType.ROBORALLY> = {
  defaultOptions: {
    checkpoints: 3,
    boardIds: ["Island"],
  },
  minPlayers: 1,
  maxPlayers: 4,

  getInitialGameState,

  async resolvePlayerAction(gameState, playerId, action) {
    // const ctx = new RoborallyContext(gameState)
    // await ctx.resolve(resolvePlayerAction, playerId, action)
    return gameState // ctx.getState()
  },

  async resolveState(gameState, onStateChanged) {
    // const ctx = new RoborallyContext(gameState, onStateChanged)
    // await ctx.resolve(resolveState)
    return gameState // ctx.getState()
  },

  validateAction,
  validateOptions,
}
