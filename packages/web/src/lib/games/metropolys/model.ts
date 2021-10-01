import { GameModel, GameState } from "@boardgames/common"

export type MetropolysAction = {
  count: number
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
  options: MetropolysOptions
  state: MetropolysState
}
