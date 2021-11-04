export type UserInfo = {
  name: string
}

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

export type BasePlayer<A extends BaseAction> = UserInfo & {
  action: A | null
  ready: boolean
}

export type BaseState<P extends BasePlayer<BaseAction>> = {
  over: boolean
  playerOrder: string[]
  players: Record<string, P>
  seed: number
}

export type GameModel<
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
