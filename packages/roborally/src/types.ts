import {
  BaseAction,
  BaseEvent,
  BaseOptions,
  BasePlayer,
  BaseState,
  GameContext,
  GameModel,
} from "@boardgames/common"

export type RoborallyAction = BaseAction

export type RoborallyEvent = BaseEvent

export type RoborallyOptions = BaseOptions

export type RoborallyPlayer = BasePlayer<RoborallyAction>

export type RoborallyState = BaseState<RoborallyPlayer>

export type RoborallyModel = GameModel<
  RoborallyAction,
  RoborallyEvent,
  RoborallyOptions,
  RoborallyPlayer,
  RoborallyState
>

export type RoborallyContext = GameContext<RoborallyModel>
