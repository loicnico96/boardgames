import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"

import { getInitialGameState } from "./getInitialGameState"
import {
  PapayooAction,
  PapayooModel,
  PapayooOptions,
  PapayooState,
} from "./model"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export class PapayooContext extends BaseContext<PapayooModel> {
  getInitialState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: BaseOptions
  ): PapayooState {
    return getInitialGameState(playerOrder, players, options)
  }

  resolveState(): Promise<void> {
    return resolveState(this)
  }

  validateAction(playerId: string, action: BaseAction): PapayooAction {
    return validateAction(this, playerId, action)
  }

  validateOptions(options: BaseOptions): PapayooOptions {
    return validateOptions(options)
  }
}
