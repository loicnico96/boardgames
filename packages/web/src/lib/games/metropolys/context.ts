import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"

import { getInitialGameState } from "./getInitialGameState"
import {
  MetropolysAction,
  MetropolysModel,
  MetropolysOptions,
  MetropolysState,
} from "./model"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export class MetropolysContext extends BaseContext<MetropolysModel> {
  getInitialState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: BaseOptions
  ): MetropolysState {
    return getInitialGameState(playerOrder, players, options)
  }

  resolveState(): Promise<void> {
    return resolveState(this)
  }

  validateAction(playerId: string, action: BaseAction): MetropolysAction {
    return validateAction(this, playerId, action)
  }

  validateOptions(options: BaseOptions): MetropolysOptions {
    return validateOptions(options)
  }
}
