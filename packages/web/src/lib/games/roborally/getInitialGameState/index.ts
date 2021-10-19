import { UserInfo } from "lib/model/UserInfo"
import { generate } from "lib/utils/array"

import { RoborallyOptions, RoborallyPlayer, RoborallyState } from "../model"

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
  players: Record<string, UserInfo>,
  options: RoborallyOptions
): RoborallyState {
  return {
    count: 0,
    over: false,
    players: generate(playerOrder, playerId => [
      playerId,
      getInitialPlayerState(players[playerId]),
    ]),
    playerOrder,
    state: 0,
  }
}
