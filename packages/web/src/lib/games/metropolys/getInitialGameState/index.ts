import { UserInfo } from "lib/model/UserInfo"

import { MetropolysState } from "../model"

export function getInitialGameState(
  players: Record<string, UserInfo>,
  playerOrder: string[]
): MetropolysState {
  return {
    count: 0,
    players: Object.keys(playerOrder).reduce((result, playerId) => {
      result[playerId] = {
        ...players[playerId],
        count: 0,
        ready: false,
      }
      return result
    }, {} as MetropolysState["players"]),
    playerOrder,
    state: 0,
  }
}
