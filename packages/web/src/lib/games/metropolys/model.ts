import { GameModel, GameState } from "@boardgames/common"

export type MetropolysAction = {
  count: number
}

export type MetropolysEvent = {
  code: string
}

export type MetropolysOptions = {
  // Empty
}

export type MetropolysState = GameState & {
  count: number
  players: Record<string, { count: number }>
  state: number
}

export type MetropolysModel = GameModel & {
  action: MetropolysAction
  event: MetropolysEvent
  options: MetropolysOptions
  state: MetropolysState
}
