import { RoomStatus } from "./rooms"

export interface BaseAction {
  [key: string]: unknown
  code: string
}

export interface BaseEvent {
  [key: string]: unknown
  code: string
}

export interface BaseOptions {
  [key: string]: unknown
}

export interface BasePlayer<A extends BaseAction = BaseAction> {
  action: A | null
  ready: boolean
}

export interface BaseState<P extends BasePlayer = BasePlayer> {
  playerOrder: string[]
  players: { [playerId in string]: P }
  status: RoomStatus
}

export interface GameData<S extends BaseState> {
  seed: number
  state: S
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
