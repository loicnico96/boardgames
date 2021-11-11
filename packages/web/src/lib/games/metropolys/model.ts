import {
  BaseAction,
  BaseEvent,
  GameModel,
  BaseOptions,
  BasePlayer,
  BaseState,
} from "@boardgames/common"

export type MetropolysAction = BaseAction

export type MetropolysEvent = BaseEvent

export type MetropolysOptions = BaseOptions

export type MetropolysPlayer = BasePlayer<MetropolysAction>

export type MetropolysState = BaseState<MetropolysPlayer>

export type MetropolysModel = GameModel<
  "metropolys",
  MetropolysAction,
  MetropolysEvent,
  MetropolysOptions,
  MetropolysPlayer,
  MetropolysState
>
