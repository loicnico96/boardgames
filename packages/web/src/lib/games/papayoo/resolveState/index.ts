import { generate } from "lib/utils/array"
import { sum } from "lib/utils/math"
import { createGenerator } from "lib/utils/random"

import { dealCards, getCardScore, getHighestCard } from "../cards"
import { PapayooContext } from "../context"

export async function nextGame(context: PapayooContext) {
  const { playerOrder, seed } = context.state

  const playerCards = dealCards(playerOrder.length, createGenerator(seed))

  context.update({
    players: generate(playerOrder, (playerId, playerIndex) => [
      playerId,
      {
        cards: {
          $set: playerCards[playerIndex],
        },
      },
    ]),
  })

  await context.post("dealCards")
}

export async function nextPlayer(context: PapayooContext, playerId: string) {
  context.update({
    currentPlayerId: {
      $set: playerId,
    },
    players: {
      [playerId]: {
        ready: {
          $set: false,
        },
      },
    },
  })

  await context.post("nextPlayer", {
    playerId,
  })
}

export async function nextRound(
  context: PapayooContext,
  playerId: string,
  score: number
) {
  const { cards, players } = context.state

  context.update({
    players: {
      [playerId]: {
        score: total => total + score,
      },
    },
  })

  await context.post("score", {
    cards,
    playerId,
    score,
  })

  context.update({
    cards: {
      $set: [],
    },
    startingPlayerId: {
      $set: playerId,
    },
  })

  await context.post("nextRound", {
    playerId,
  })

  if (players[playerId].cards.length === 0) {
    await nextGame(context)
  }

  await nextPlayer(context, playerId)
}

export async function resolveState(context: PapayooContext) {
  const { cards, currentPlayerId, playerOrder, startingPlayerId } =
    context.state

  if (context.allReady()) {
    if (cards.length < playerOrder.length) {
      const nextPlayerId = context.nextPlayerId(currentPlayerId)

      await nextPlayer(context, nextPlayerId)
    } else {
      const highestCardPlayerId = context.nextPlayerId(
        startingPlayerId,
        getHighestCard(cards)
      )

      const score = sum(cards.map(getCardScore))

      await nextRound(context, highestCardPlayerId, score)
    }
  }
}
