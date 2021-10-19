import { UserInfo } from "lib/model/UserInfo"
import { generate } from "lib/utils/array"
import { randomValue } from "lib/utils/random"

import { dealCards } from "../cards"
import { PapayooOptions, PapayooPlayer, PapayooState } from "../model"

export function getInitialPlayerState(
  userInfo: UserInfo,
  isStartingPlayer: boolean,
  cards: number[]
): PapayooPlayer {
  return {
    ...userInfo,
    action: null,
    cards,
    ready: !isStartingPlayer,
    score: 0,
  }
}

export function getInitialGameState(
  playerOrder: string[],
  players: Record<string, UserInfo>,
  options: PapayooOptions
): PapayooState {
  const playerCards = dealCards(playerOrder.length)

  const startingPlayerId = randomValue(playerOrder)

  return {
    cards: [],
    currentPlayerId: startingPlayerId,
    over: false,
    playerOrder,
    players: generate(playerOrder, (playerId, index) => [
      playerId,
      getInitialPlayerState(
        players[playerId],
        playerId === startingPlayerId,
        playerCards[index]
      ),
    ]),
    seed: Math.random(),
    startingPlayerId,
  }
}
