import { GameSettings } from "@boardgames/common"

import { PapayooContext } from "./context"
import { getInitialGameState } from "./getInitialGameState"
import { PapayooModel } from "./model"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateOptions } from "./validateOptions"
import { validatePlayerAction } from "./validatePlayerAction"

export const PapayooSettings: GameSettings<PapayooModel> = {
  defaultOptions: {},
  minPlayers: 3,
  maxPlayers: 8,

  getInitialGameState,

  async resolvePlayerAction(state, playerId, action) {
    const context = new PapayooContext(state)
    await resolvePlayerAction(context, playerId, action)
    return context.state
  },

  async resolveState(state, onStateChanged) {
    const context = new PapayooContext(state, onStateChanged)
    if (context.allReady()) {
      await resolveState(context)
    }
    return context.state
  },

  validateOptions,
  validatePlayerAction,
}
