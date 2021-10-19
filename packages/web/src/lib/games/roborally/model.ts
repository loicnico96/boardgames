import {
  BaseAction,
  BaseEvent,
  BaseOptions,
  BasePlayer,
  BaseState,
  GameModel,
} from "@boardgames/common"

export type RoborallyAction = BaseAction & {
  count: number
}

export type RoborallyEvent = BaseEvent

export type RoborallyOptions = BaseOptions

export type RoborallyPlayer = BasePlayer<RoborallyAction> & {
  count: number
}

export type RoborallyState = BaseState<RoborallyPlayer> & {
  count: number
  state: number
}

export type RoborallyModel = GameModel<
  RoborallyAction,
  RoborallyEvent,
  RoborallyOptions,
  RoborallyPlayer,
  RoborallyState
>
