import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"
import { generate, object } from "@boardgames/utils"

import {
  PapayooAction,
  PapayooModel,
  PapayooOptions,
  PapayooState,
} from "./model"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"

export class PapayooContext extends BaseContext<PapayooModel> {
  constructor() {
    super("papayoo")
  }

  async getInitialGameState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: PapayooOptions,
    seed: number
  ): Promise<PapayooState> {
    const startingPlayerId = this.generator.pick(playerOrder)

    return {
      cards: [],
      currentPlayerId: startingPlayerId,
      phase: "nextGame",
      over: false,
      playerOrder,
      players: generate(playerOrder, playerId => [
        playerId,
        {
          ...players[playerId],
          action: null,
          cards: [],
          ready: true,
          score: 0,
        },
      ]),
      seed,
      startingPlayerId,
    }
  }

  async resolveState() {
    return resolveState(this)
  }

  getDefaultOptions(): PapayooOptions {
    return {}
  }

  validateOptions(options: BaseOptions): PapayooOptions {
    return object({})(options)
  }

  validateAction(playerId: string, action: BaseAction): PapayooAction {
    return validateAction(this, playerId, action)
  }
}
