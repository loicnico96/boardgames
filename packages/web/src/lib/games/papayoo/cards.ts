import { fill, sortBy } from "lib/utils/array"
import { mutableShuffle, Random } from "lib/utils/random"
import { assert } from "lib/utils/types"

import { Card, CardColor } from "./model"

const CARDS: Card[] = [
  ...fill(20, index => ({ color: CardColor.BLACK, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.BLUE, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.GREEN, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.ORANGE, value: index + 1 })),
  ...fill(10, index => ({ color: CardColor.PINK, value: index + 1 })),
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

export function getDeck(playerCount: number, generator?: Random): number[] {
  const deck = fill(CARDS.length, card => card)

  mutableShuffle(deck, generator)

  if (playerCount >= 7) {
    return deck.filter(
      card => getCardColor(card) !== CardColor.BLACK && getCardValue(card) === 1
    )
  }

  return deck
}

export function dealCards(playerCount: number, generator?: Random): number[][] {
  const deck = getDeck(playerCount, generator)

  assert(deck.length % playerCount === 0, "Cannot be divided by player count")

  const handSize = deck.length / playerCount

  return fill(playerCount, playerIndex =>
    sortBy(
      deck.slice(playerIndex * handSize, playerIndex * handSize + handSize),
      card => card
    )
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

export function isCardPlayable(
  card: number,
  hand: number[],
  requestedColor: CardColor | null
): boolean {
  return (
    requestedColor === null ||
    getCardColor(card) === requestedColor ||
    !hand.map(getCardColor).includes(requestedColor)
  )
}
