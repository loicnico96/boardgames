import { GameSettings } from "@boardgames/common"

import { RoborallyContext } from "./context"
import { getInitialGameState } from "./getInitialGameState"
import { RoborallyModel } from "./model"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateOptions } from "./validateOptions"
import { validatePlayerAction } from "./validatePlayerAction"

export const RoborallySettings: GameSettings<RoborallyModel> = {
  defaultOptions: { code: "roborally/default" },
  minPlayers: 1,
  maxPlayers: 4,

  getInitialGameState,

  async resolvePlayerAction(state, playerId, action) {
    const context = new RoborallyContext(state)
    await resolvePlayerAction(context, playerId, action)
    return context.state
  },

  async resolveState(state, onStateChanged) {
    const context = new RoborallyContext(state, onStateChanged)
    await resolveState(context)
    return context.state
  },

  validateOptions,
  validatePlayerAction,
}
