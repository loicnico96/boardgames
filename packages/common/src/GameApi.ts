import { GameModel, GameStateChangeListener } from "./GameModel"
import { UserInfo } from "./UserInfo"

export type GameApi<M extends GameModel> = {
  getInitialGameState: (
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: M["options"]
  ) => M["state"]

  resolvePlayerAction: (
    state: M["state"],
    playerId: string,
    action: M["action"]
  ) => Promise<M["state"]>

  resolveState: (
    state: M["state"],
    onStateChange?: GameStateChangeListener<M>
  ) => Promise<M["state"]>

  validatePlayerAction: (
    state: M["state"],
    playerId: string,
    action: unknown
  ) => M["action"]

  validateOptions: (options: unknown) => M["options"]
}
