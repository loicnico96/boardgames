import {
  BaseAction,
  BaseContext,
  BaseOptions,
  BasePlayer,
  BaseState,
  BaseModel,
  RoomData,
} from "@boardgames/common"
import { mapValues } from "@boardgames/utils"

export type MetropolysModel = BaseModel

export class MetropolysContext extends BaseContext<MetropolysModel> {
  getDefaultOptions(): BaseOptions {
    return {}
  }

  async getInitialGameState(
    room: RoomData<string, MetropolysModel>,
    seed: number
  ): Promise<BaseState<BasePlayer<BaseAction>>> {
    return {
      finished: false,
      playerOrder: room.playerOrder,
      players: mapValues(room.players, player => ({
        ...player,
        action: null,
        ready: true,
      })),
      seed,
    }
  }

  async resolveState(): Promise<void> {
    return Promise.resolve()
  }

  validateAction(playerId: string, action: BaseAction): BaseAction {
    return action
  }

  validateOptions(options: BaseOptions): BaseOptions {
    return options
  }
}
