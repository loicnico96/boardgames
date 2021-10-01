export type GameEvent = {
  code: string
}

export type GamePlayer = {
  ready: boolean
}

export type GameState = {
  playerOrder: string[]
  players: Record<string, GamePlayer>
}

export type GameModel = {
  action: Record<string, unknown>
  event: GameEvent
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
