export interface GameState {
  playerOrder: string[]
  players: Record<string, unknown>
}

export interface GameModel {
  action: Record<string, unknown>
  event: Record<string, unknown>
  options: Record<string, unknown>
  state: GameState
}

export type GameStateChangeListener<M extends GameModel> = (
  newState: ReadonlyDeep<M["state"]>,
  event: ReadonlyDeep<M["event"]>
) => Promise<void>

export type ReadonlyDeep<T> = T extends Record<string, any>
  ? T extends ReadonlyArray<infer R>
    ? ReadonlyArray<ReadonlyDeep<R>>
    : Readonly<{ [K in keyof T]: ReadonlyDeep<T[K]> }>
  : T

export interface UserInfo {
  name: string
}
