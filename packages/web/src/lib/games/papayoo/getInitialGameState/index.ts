import { UserInfo } from "lib/model/UserInfo"
import { generate } from "lib/utils/array"
import { randomValue } from "lib/utils/random"

import { PapayooOptions, PapayooPlayer, PapayooState } from "../model"

export function getInitialPlayerState(userInfo: UserInfo): PapayooPlayer {
  return {
    ...userInfo,
    action: null,
    cards: [],
    ready: true,
    score: 0,
  }
}

export function getInitialGameState(
  playerOrder: string[],
  players: Record<string, UserInfo>,
  options: PapayooOptions
): PapayooState {
  const startingPlayerId = randomValue(playerOrder)

  return {
    cards: [],
    currentPlayerId: startingPlayerId,
    phase: "nextGame",
    over: false,
    playerOrder,
    players: generate(playerOrder, playerId => [
      playerId,
      getInitialPlayerState(players[playerId]),
    ]),
    seed: Math.random(),
    startingPlayerId,
  }
}
