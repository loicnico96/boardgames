import { getSwapCardCount } from "lib/games/papayoo/cards"
import { fill } from "lib/utils/array"

import { Card } from "./Card"
import { CardList } from "./CardList"
import { usePapayooStore } from "./store"

export function SwapCardField({ playerId }: { playerId: string }) {
  const swapField = usePapayooStore(store =>
    fill(
      getSwapCardCount(store.state.playerOrder.length),
      index => store.ui.swap[index] ?? null
    )
  )

  const disabled = usePapayooStore(
    store => store.state.players[playerId].ready === true
  )

  const unswapCard = usePapayooStore(store => store.actions.unswapCard)

  return (
    <CardList>
      {swapField.map((card, index) => (
        <Card
          card={card}
          disabled={disabled}
          onClick={unswapCard}
          playable
          key={index}
        />
      ))}
    </CardList>
  )
}
