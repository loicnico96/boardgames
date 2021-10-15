import { UserInfo } from "lib/model/UserInfo"
import { generate } from "lib/utils/array"

import { MetropolysPlayer, MetropolysState } from "../model"

export function getInitialPlayerState(userInfo: UserInfo): MetropolysPlayer {
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
): MetropolysState {
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
