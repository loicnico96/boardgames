import {
  BaseAction,
  BaseOptions,
  Action,
  BaseModel,
  Options,
  State,
  StateChangeListener,
} from "./GameModel"
import { UserInfo } from "./UserInfo"

export type GameApi<M extends BaseModel> = {
  getInitialGameState: (
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: Options<M>
  ) => State<M>

  resolvePlayerAction: (
    state: State<M>,
    playerId: string,
    action: Action<M>
  ) => Promise<State<M>>

  resolveState: (
    state: State<M>,
    onStateChange?: StateChangeListener<M>
  ) => Promise<State<M>>

  validatePlayerAction: (
    state: State<M>,
    playerId: string,
    action: BaseAction
  ) => Action<M>

  validateOptions: (options: BaseOptions) => Options<M>
}
