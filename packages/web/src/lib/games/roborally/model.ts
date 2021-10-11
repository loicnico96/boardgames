import { GameModel, GamePlayer, GameState } from "@boardgames/common"

export type RoborallyAction = {
  count: number
}

export type RoborallyOptions = {
  // Empty
}

export type RoborallyPlayer = GamePlayer & {
  count: number
}

export type RoborallyState = GameState<RoborallyPlayer> & {
  count: number
  state: number
}

export type RoborallyModel = GameModel & {
  action: RoborallyAction
  options: RoborallyOptions
  state: RoborallyState
}
