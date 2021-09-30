export type GameState = {
  playerOrder: string[]
  players: Record<string, unknown>
}

export type GameModel = {
  action: Record<string, unknown>
  event: Record<string, unknown>
  options: Record<string, unknown>
  state: GameState
}

export type GameStateChangeListener<M extends GameModel> = (
  newState: M["state"],
  event: M["event"]
) => Promise<void>

export type UserInfo = {
  name: string
}
