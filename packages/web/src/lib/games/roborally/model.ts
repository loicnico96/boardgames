import { GameModel, GameState } from "@boardgames/common"

export type RoborallyAction = {
  count: number
}

export type RoborallyEvent = {
  code: string
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
  event: RoborallyEvent
  options: RoborallyOptions
  state: RoborallyState
}
