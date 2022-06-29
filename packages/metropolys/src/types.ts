import {
  BaseAction,
  BaseEvent,
  BaseOptions,
  BasePlayer,
  BaseState,
  GameContext,
  GameModel,
} from "@boardgames/common"

export type MetropolysAction = BaseAction

export type MetropolysEvent = BaseEvent

export type MetropolysOptions = BaseOptions

export type MetropolysPlayer = BasePlayer<MetropolysAction>

export type MetropolysState = BaseState<MetropolysPlayer>

export type MetropolysModel = GameModel<
  MetropolysAction,
  MetropolysEvent,
  MetropolysOptions,
  MetropolysPlayer,
  MetropolysState
>

export type MetropolysContext = GameContext<MetropolysModel>
