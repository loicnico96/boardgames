import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"
import { generate, object } from "@boardgames/utils"

import {
  MetropolysAction,
  MetropolysModel,
  MetropolysOptions,
  MetropolysState,
} from "./model"

export class MetropolysContext extends BaseContext<MetropolysModel> {
  async getInitialGameState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: MetropolysOptions,
    seed: number
  ): Promise<MetropolysState> {
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

  getDefaultOptions(): MetropolysOptions {
    return {}
  }

  validateOptions(options: BaseOptions): MetropolysOptions {
    return object({})(options)
  }

  validateAction(playerId: string, action: BaseAction): MetropolysAction {
    return action
  }
}
