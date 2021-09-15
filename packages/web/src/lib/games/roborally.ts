import { GameModel, GameSettings, GameState } from "@boardgames/common"

export interface RoborallyModel extends GameModel {
  action: { code: string }
  event: { code: string }
  options: { code: string }
  state: GameState & { state: number }
}

export const RoborallySettings: GameSettings<RoborallyModel> = {
  defaultOptions: { code: "default" },
  minPlayers: 1,
  maxPlayers: 4,

  getInitialGameState(players, playerOrder) {
    return { players, playerOrder, state: 0 }
  },

  async resolvePlayerAction(state) {
    return state
  },

  async resolveState(state) {
    return state
  },

  validatePlayerAction() {
    return { code: "default" }
  },

  validateOptions() {
    return { code: "default" }
  },
}
