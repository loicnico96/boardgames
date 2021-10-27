import { getSwapCardCount } from "lib/games/papayoo/cards"
import { fill } from "lib/utils/array"

import {
  usePapayooActions,
  usePapayooPlayer,
  usePapayooState,
  usePapayooStore,
} from "../store"

import { Card } from "./Card"
import { CardList } from "./CardList"

export function SwapCardField({ playerId }: { playerId: string }) {
  const swapCardsLocal = usePapayooStore(store => store.swap.cards)

  const swapCards = usePapayooPlayer(playerId, player =>
    player.ready && player.action?.code === "swapCard"
      ? player.action.cards
      : swapCardsLocal
  )

  const swapCount = usePapayooState(state =>
    getSwapCardCount(state.playerOrder.length)
  )

  const isReady = usePapayooPlayer(playerId, player => player.ready)

  const { unswapCard } = usePapayooActions()

  return (
    <CardList>
      {fill(swapCount, index => {
        const card = swapCards[index] ?? null
        if (card !== null && !isReady) {
          return (
            <Card
              card={card}
              key={index}
              onClick={unswapCard}
              variant="valid"
            />
          )
        }

        return <Card card={card} key={index} />
      })}
    </CardList>
  )
}
