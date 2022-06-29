import { Random } from "@boardgames/utils"

import { GameContext } from "./context"
import { BaseAction, BaseOptions, GameModel, RoomData } from "./model"

export interface GameDefinition<M extends GameModel> {
  getInitialGameState: (
    room: RoomData<string, M["options"]>,
    generator: Random,
    fetcher: <T>(ref: string) => Promise<T>
  ) => Promise<M["state"]>

  getInitialOptions: (
    generator: Random,
    fetcher: <T>(ref: string) => Promise<T>
  ) => Promise<M["options"]>

  resolveState: (context: GameContext<M>) => Promise<void>

  validateAction: (
    state: M["state"],
    playerId: string,
    action: BaseAction
  ) => M["action"]

  validateOptions: (options: BaseOptions) => M["options"]
}
