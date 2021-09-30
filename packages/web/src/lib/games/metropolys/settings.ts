import { GameSettings } from "@boardgames/common"

import { MetropolysContext } from "./context"
import { getInitialGameState } from "./getInitialGameState"
import { MetropolysModel } from "./model"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateOptions } from "./validateOptions"
import { validatePlayerAction } from "./validatePlayerAction"

export const MetropolysSettings: GameSettings<MetropolysModel> = {
  defaultOptions: { code: "metropolys/default" },
  minPlayers: 1,
  maxPlayers: 4,

  getInitialGameState,

  async resolvePlayerAction(state, playerId, action) {
    const context = new MetropolysContext(state)
    await context.resolve(resolvePlayerAction, playerId, action)
    return context.state
  },

  async resolveState(state, onStateChanged) {
    const context = new MetropolysContext(state, onStateChanged)
    await context.resolve(resolveState)
    return context.state
  },

  validateOptions,
  validatePlayerAction,
}
