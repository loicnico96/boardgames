export type GameEvent = {
  code: string
}

export type GamePlayer = {
  name: string
  ready: boolean
}

export type GameState<P extends GamePlayer> = {
  playerOrder: string[]
  players: Record<string, P>
}

export type GameModel = {
  action: Record<string, unknown>
  event: GameEvent
  options: Record<string, unknown>
  state: GameState<GamePlayer>
}

export type GameStateChangeListener<M extends GameModel> = (
  newState: M["state"],
  event: M["event"]
) => Promise<void>
