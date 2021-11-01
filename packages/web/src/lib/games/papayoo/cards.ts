import { fill, generate, sortBy, Random, assert } from "@boardgames/utils"

import { Card, CardColor, PapayooPlayer } from "./model"

const CARDS: Card[] = [
  ...fill(20, index => ({ color: CardColor.BLACK, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.SPADES, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.HEARTS, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.CLUBS, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.DIAMONDS, value: index + 1 })),
]

export function isValidCard(card: number): boolean {
  return CARDS[card] !== undefined
}

export function getCardColor(card: number): CardColor {
  return CARDS[card].color
}

export function getCardValue(card: number): number {
  return CARDS[card].value
}

export function getCardScore(card: number): number {
  return getCardColor(card) === CardColor.BLACK
    ? getCardValue(card)
    : getCardValue(card) === 7
    ? 40
    : 0
}

export function getDeck(playerCount: number): number[] {
  const deck = fill(CARDS.length, card => card)

  if (playerCount >= 7) {
    return deck.filter(
      card => getCardColor(card) === CardColor.BLACK || getCardValue(card) !== 1
    )
  }

  return deck
}

export function sortCards(cards: number[]): number[] {
  return sortBy(cards, card => card)
}

export function dealCards(
  generator: Random,
  playerOrder: string[]
): Record<string, number[]> {
  const playerCount = playerOrder.length
  const deck = getDeck(playerCount)

  generator.shuffle(deck)

  assert(deck.length % playerCount === 0, "Cannot be divided by player count")

  const handSize = deck.length / playerCount

  return generate(playerOrder, (playerId, playerIndex) => [
    playerId,
    sortCards(
      deck.slice(playerIndex * handSize, playerIndex * handSize + handSize)
    ),
  ])
}

export function getSwapCardCount(playerCount: number): number {
  return (
    {
      3: 6,
      4: 5,
      5: 4,
      6: 3,
      7: 3,
      8: 3,
    }[playerCount] ?? 3
  )
}

export function getRequestedColor(cards: number[]): CardColor | null {
  return cards.length > 0 ? getCardColor(cards[0]) : null
}

export function getHighestCard(cards: number[]): number {
  const requestedColor = getRequestedColor(cards)

  if (requestedColor === null) {
    return -1
  }

  let highestCardIndex = 0
  let highestValue = getCardValue(cards[0])

  for (let index = 1; index < cards.length; index++) {
    const card = cards[index]
    if (getCardColor(card) === requestedColor) {
      if (getCardValue(card) > highestValue) {
        highestCardIndex = index
        highestValue = getCardValue(card)
      }
    }
  }

  return highestCardIndex
}

export function isAbleToPlay(
  card: number,
  requestedColor: CardColor | null
): boolean {
  return requestedColor === null || getCardColor(card) === requestedColor
}

export function isAbleToDiscard(
  player: PapayooPlayer,
  requestedColor: CardColor | null
): boolean {
  return (
    requestedColor !== null &&
    !player.cards.map(getCardColor).includes(requestedColor)
  )
}
