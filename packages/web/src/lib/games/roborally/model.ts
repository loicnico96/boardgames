import { GameModel, GameState } from "@boardgames/common"

export type RoborallyAction = {
  count: number
}

export type RoborallyOptions = {
  // Empty
}

export type RoborallyState = GameState & {
  count: number
  players: Record<string, { count: number }>
  state: number
}

export type RoborallyModel = GameModel & {
  action: RoborallyAction
  options: RoborallyOptions
  state: RoborallyState
}
