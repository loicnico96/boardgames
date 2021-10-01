import { UserInfo } from "lib/model/UserInfo"

import { RoborallyState } from "../model"

export function getInitialGameState(
  players: Record<string, UserInfo>,
  playerOrder: string[]
): RoborallyState {
  return {
    count: 0,
    players: Object.keys(playerOrder).reduce((result, playerId) => {
      result[playerId] = {
        ...players[playerId],
        count: 0,
        ready: false,
      }
      return result
    }, {} as RoborallyState["players"]),
    playerOrder,
    state: 0,
  }
}
