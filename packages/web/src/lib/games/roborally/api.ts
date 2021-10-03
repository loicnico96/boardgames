import { GameApi } from "@boardgames/common"

import { RoborallyContext } from "./context"
import { getInitialGameState } from "./getInitialGameState"
import { RoborallyModel } from "./model"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateOptions } from "./validateOptions"
import { validatePlayerAction } from "./validatePlayerAction"

export const RoborallyApi: GameApi<RoborallyModel> = {
  getInitialGameState,

  async resolvePlayerAction(state, playerId, action) {
    const ctx = new RoborallyContext(state)
    await resolvePlayerAction(ctx, playerId, action)
    return ctx.state
  },

  async resolveState(state, onStateChange) {
    const ctx = new RoborallyContext(state, onStateChange)
    await resolveState(ctx)
    return ctx.state
  },

  validatePlayerAction,

  validateOptions,
}
