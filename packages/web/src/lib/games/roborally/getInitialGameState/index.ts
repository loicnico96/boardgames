import { UserInfo } from "lib/model/UserInfo"
import { generate } from "lib/utils/array"

import { RoborallyPlayer, RoborallyState } from "../model"

export function getInitialPlayerState(userInfo: UserInfo): RoborallyPlayer {
  return {
    ...userInfo,
    action: null,
    count: 0,
    ready: false,
  }
}

export function getInitialGameState(
  playerOrder: string[],
  players: Record<string, UserInfo>
): RoborallyState {
  return {
    count: 0,
    players: generate(playerOrder, playerId => [
      playerId,
      getInitialPlayerState(players[playerId]),
    ]),
    playerOrder,
    state: 0,
  }
}
