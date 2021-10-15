import {
  BaseAction,
  BaseEvent,
  BaseModel,
  BaseOptions,
  BasePlayer,
  BaseState,
} from "@boardgames/common"

export type MetropolysAction = BaseAction & {
  count: number
}

export type MetropolysEvent = BaseEvent

export type MetropolysOptions = BaseOptions

export type MetropolysPlayer = BasePlayer<MetropolysAction> & {
  count: number
}

export type MetropolysState = BaseState<MetropolysPlayer> & {
  count: number
  state: number
}

export type MetropolysModel = BaseModel & {
  event: MetropolysEvent
  options: MetropolysOptions
  state: MetropolysState
}
