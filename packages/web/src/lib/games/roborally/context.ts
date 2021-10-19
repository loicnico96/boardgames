import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"

import { getInitialGameState } from "./getInitialGameState"
import {
  RoborallyAction,
  RoborallyModel,
  RoborallyOptions,
  RoborallyState,
} from "./model"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export class RoborallyContext extends BaseContext<RoborallyModel> {
  getInitialState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: BaseOptions
  ): RoborallyState {
    return getInitialGameState(playerOrder, players, options)
  }

  resolveState(): Promise<void> {
    return resolveState(this)
  }

  validateAction(playerId: string, action: BaseAction): RoborallyAction {
    return validateAction(this, playerId, action)
  }

  validateOptions(options: BaseOptions): RoborallyOptions {
    return validateOptions(options)
  }
}
