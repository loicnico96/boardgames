import { GameModel, GamePlayer, GameState } from "@boardgames/common"

export type MetropolysAction = {
  count: number
}

export type MetropolysOptions = {
  // Empty
}

export type MetropolysPlayer = GamePlayer & {
  count: number
}

export type MetropolysState = GameState<MetropolysPlayer> & {
  count: number
  state: number
}

export type MetropolysModel = GameModel & {
  action: MetropolysAction
  options: MetropolysOptions
  state: MetropolysState
}
