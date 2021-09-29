import { GameModel, GameStateChangeListener, UserInfo } from "./types"

export type GameSettings<M extends GameModel> = {
  defaultOptions: M["options"]
  minPlayers: number
  maxPlayers: number

  getInitialGameState: (
    players: Record<string, UserInfo>,
    playerOrder: string[],
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

  validateOptions: (options: unknown) => M["options"]

  validatePlayerAction: (
    state: M["state"],
    playerId: string,
    action: unknown
  ) => M["action"]
}
