import { UserInfo } from "lib/model/UserInfo"

import { RoborallyState } from "../model"

export function getInitialGameState(
  playerOrder: string[],
  players: Record<string, UserInfo>
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
