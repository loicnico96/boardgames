export type BaseAction = {
  [key: string]: unknown
  code: string
}

export type BaseEvent = {
  [key: string]: unknown
  code: string
}

export type BaseOptions = {
  [key: string]: unknown
}

export type BasePlayer<A extends BaseAction = BaseAction> = {
  action: A | null
  ready: boolean
}

export type BaseState<P extends BasePlayer = BasePlayer> = {
  finished: boolean
  playerOrder: string[]
  players: { [playerId in string]?: P }
  seed: number
}

export type BaseModel<
  A extends BaseAction = BaseAction,
  E extends BaseEvent = BaseEvent,
  O extends BaseOptions = BaseOptions,
  P extends BasePlayer<A> = BasePlayer<A>,
  S extends BaseState<P> = BaseState<P>
> = {
  action: A
  event: E
  options: O
  player: P
  state: S
}
