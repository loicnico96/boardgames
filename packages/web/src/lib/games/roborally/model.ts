import {
  BaseAction,
  BaseEvent,
  BaseModel,
  BaseOptions,
  BasePlayer,
  BaseState,
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

export type RoborallyModel = BaseModel & {
  event: RoborallyEvent
  options: RoborallyOptions
  state: RoborallyState
}
