import { getHighestCard } from "lib/games/papayoo/cards"
import { fill } from "lib/utils/array"

import { Card } from "./Card"
import { CardList } from "./CardList"
import { usePapayooStore } from "./store"

export function PlayCardField() {
  const playField = usePapayooStore(store =>
    fill(
      store.state.playerOrder.length,
      index => store.state.cards[index] ?? null
    )
  )

  const highestCardIndex = usePapayooStore(store =>
    getHighestCard(store.state.cards)
  )

  return (
    <CardList>
      {playField.map((card, index) => (
        <Card
          card={card}
          highlighted={index === highestCardIndex}
          key={index}
        />
      ))}
    </CardList>
  )
}
