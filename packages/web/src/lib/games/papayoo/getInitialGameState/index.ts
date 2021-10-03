import { UserInfo } from "lib/model/UserInfo"
import { generate } from "lib/utils/array"
import { randomValue } from "lib/utils/random"

import { dealCards } from "../cards"
import { PapayooState } from "../model"

export function getInitialGameState(
  playerOrder: string[],
  players: Record<string, UserInfo>
): PapayooState {
  const playerCards = dealCards(playerOrder.length)

  const startingPlayerId = randomValue(playerOrder)

  return {
    cards: [],
    currentPlayerId: startingPlayerId,
    playerOrder,
    players: generate(playerOrder, (playerId, index) => [
      playerId,
      {
        ...players[playerId],
        cards: playerCards[index],
        ready: playerId !== startingPlayerId,
        score: 0,
      },
    ]),
    seed: Math.random(),
    startingPlayerId,
  }
}
