import { GameApi } from "@boardgames/common"

import { PapayooContext } from "./context"
import { getInitialGameState } from "./getInitialGameState"
import { PapayooModel } from "./model"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateOptions } from "./validateOptions"
import { validatePlayerAction } from "./validatePlayerAction"

export const PapayooApi: GameApi<PapayooModel> = {
  getInitialGameState,

  async resolvePlayerAction(state, playerId, action) {
    const ctx = new PapayooContext(state)
    await resolvePlayerAction(ctx, playerId, action)
    return ctx.state
  },

  async resolveState(state, onStateChange) {
    const ctx = new PapayooContext(state, onStateChange)
    await resolveState(ctx)
    return ctx.state
  },

  validatePlayerAction,

  validateOptions,
}
