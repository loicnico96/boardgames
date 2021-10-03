import { GameApi } from "@boardgames/common"

import { MetropolysContext } from "./context"
import { getInitialGameState } from "./getInitialGameState"
import { MetropolysModel } from "./model"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateOptions } from "./validateOptions"
import { validatePlayerAction } from "./validatePlayerAction"

export const MetropolysApi: GameApi<MetropolysModel> = {
  getInitialGameState,

  async resolvePlayerAction(state, playerId, action) {
    const ctx = new MetropolysContext(state)
    await resolvePlayerAction(ctx, playerId, action)
    return ctx.state
  },

  async resolveState(state, onStateChange) {
    const ctx = new MetropolysContext(state, onStateChange)
    await resolveState(ctx)
    return ctx.state
  },

  validatePlayerAction,

  validateOptions,
}
