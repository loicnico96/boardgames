import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"
import { generate, object } from "@boardgames/utils"

import {
  RoborallyAction,
  RoborallyModel,
  RoborallyOptions,
  RoborallyState,
} from "./model"

export class RoborallyContext extends BaseContext<RoborallyModel> {
  getInitialGameState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: RoborallyOptions,
    seed: number
  ): RoborallyState {
    return {
      over: false,
      playerOrder,
      players: generate(playerOrder, playerId => [
        playerId,
        {
          ...players[playerId],
          action: null,
          ready: true,
        },
      ]),
      seed,
    }
  }

  async resolveState() {
    // Todo
  }

  getDefaultOptions(): RoborallyOptions {
    return {}
  }

  validateOptions(options: BaseOptions): RoborallyOptions {
    return object({})(options)
  }

  validateAction(playerId: string, action: BaseAction): RoborallyAction {
    return action
  }
}
