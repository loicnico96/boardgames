import { sum, assert } from "@boardgames/utils"

import { dealCards, getCardScore, getHighestCard, sortCards } from "../cards"
import { PapayooContext } from "../context"

export async function nextGame(context: PapayooContext) {
  const { playerOrder } = context.state

  const playerCards = dealCards(context.generator, playerOrder)

  context.update({
    $merge: {
      cards: [],
      phase: "swapCard",
    },
  })

  for (const playerId of playerOrder) {
    context.updatePlayer(playerId, {
      $merge: {
        cards: playerCards[playerId],
      },
    })

    context.requireAction(playerId)
  }

  await context.post({
    code: "nextGame",
  })
}

export async function nextPlayer(context: PapayooContext, playerId: string) {
  context.update({
    $merge: {
      currentPlayerId: playerId,
    },
  })

  context.requireAction(playerId)

  await context.post({
    code: "nextPlayer",
    playerId,
  })
}

export async function nextRound(context: PapayooContext) {
  const { startingPlayerId } = context.state

  context.update({
    $merge: {
      cards: [],
    },
  })

  await context.post({
    code: "nextRound",
    playerId: startingPlayerId,
  })

  await nextPlayer(context, startingPlayerId)
}

export async function endRound(context: PapayooContext) {
  const { cards, startingPlayerId } = context.state

  const highestCardPlayerId = context.nextPlayerId(
    startingPlayerId,
    getHighestCard(cards)
  )

  const score = sum(cards.map(getCardScore))

  context.updatePlayer(highestCardPlayerId, {
    score: total => total + score,
  })

  await context.post({
    code: "score",
    playerId: highestCardPlayerId,
    cards,
    score,
  })

  context.update({
    $merge: {
      startingPlayerId: highestCardPlayerId,
    },
  })

  if (context.player(highestCardPlayerId).cards.length > 0) {
    await nextRound(context)
  } else {
    await nextGame(context)
  }
}

export async function playCard(
  context: PapayooContext,
  playerId: string,
  card: number
) {
  context.updatePlayer(playerId, {
    cards: cards => cards.filter(item => item !== card),
  })

  context.update({
    cards: {
      $push: [card],
    },
  })

  await context.post({
    code: "playCard",
    playerId,
    card,
  })
}

export async function swapCards(context: PapayooContext) {
  const { playerOrder } = context.state

  for (const playerId of playerOrder) {
    const { action } = context.player(playerId)
    assert(action?.code === "swapCard", "Invalid state")

    const nextPlayerId = context.nextPlayerId(playerId)

    context.updatePlayer(playerId, {
      cards: cards => cards.filter(card => !action.cards.includes(card)),
    })

    context.updatePlayer(nextPlayerId, {
      cards: cards => sortCards([...cards, ...action.cards]),
    })
  }

  await context.post({
    code: "swapCard",
  })

  context.update({
    $merge: {
      phase: "playCard",
    },
  })

  await nextRound(context)
}

export async function resolveState(context: PapayooContext) {
  const { phase } = context.state

  switch (phase) {
    case "nextGame": {
      return nextGame(context)
    }

    case "playCard": {
      const { currentPlayerId } = context.state
      const { action } = context.player(currentPlayerId)
      assert(action?.code === "playCard", "Invalid state")
      await playCard(context, currentPlayerId, action.card)

      if (context.state.cards.length < context.state.playerOrder.length) {
        return nextPlayer(context, context.nextPlayerId(currentPlayerId))
      } else {
        return endRound(context)
      }
    }

    case "swapCard": {
      return swapCards(context)
    }

    default:
      throw Error("Invalid state")
  }
}
