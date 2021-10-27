import { UserInfo } from "lib/model/UserInfo"
import { generate } from "lib/utils/array"

import { MetropolysOptions, MetropolysPlayer, MetropolysState } from "../model"

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
  players: Record<string, UserInfo>,
  options: MetropolysOptions
): MetropolysState {
  return {
    count: 0,
    over: false,
    players: generate(playerOrder, playerId => [
      playerId,
      getInitialPlayerState(players[playerId]),
    ]),
    playerOrder,
    seed: Date.now(),
    state: 0,
  }
}
