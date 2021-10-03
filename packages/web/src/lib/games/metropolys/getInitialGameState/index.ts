import { UserInfo } from "lib/model/UserInfo"

import { MetropolysState } from "../model"

export function getInitialGameState(
  playerOrder: string[],
  players: Record<string, UserInfo>
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
