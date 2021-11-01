import { fill } from "@boardgames/utils"

import { getHighestCard } from "lib/games/papayoo/cards"

import { usePapayooState } from "../store"

import { Card } from "./Card"
import { CardList } from "./CardList"

export function PlayCardField() {
  const playField = usePapayooState(state =>
    fill(state.playerOrder.length, index => state.cards[index] ?? null)
  )

  const highestCardIndex = usePapayooState(state => getHighestCard(state.cards))

  return (
    <CardList>
      {playField.map((card, index) => (
        <Card
          card={card}
          key={index}
          variant={index === highestCardIndex ? "highlight" : undefined}
        />
      ))}
    </CardList>
  )
}
