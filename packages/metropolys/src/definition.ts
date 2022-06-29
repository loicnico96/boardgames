import { GameDefinition, RoomStatus } from "@boardgames/common"
import { mapValues } from "@boardgames/utils"

import { MetropolysModel } from "./types"

export const Metropolys: GameDefinition<MetropolysModel> = {
  async getInitialGameState(room) {
    return {
      playerOrder: room.playerOrder,
      players: mapValues(room.players, player => ({
        ...player,
        action: null,
        ready: true,
      })),
      status: RoomStatus.ONGOING,
    }
  },

  async getInitialOptions() {
    return {}
  },

  async resolveState(context) {
    return context.post({ code: "hello" })
  },

  validateAction(state, playerId, action) {
    return action
  },

  validateOptions(options) {
    return options
  },
}
