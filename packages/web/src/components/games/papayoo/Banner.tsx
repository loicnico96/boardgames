import { useCurrentUserId } from "hooks/store/useCurrentUserId"

import { PlayCardBanner } from "./PlayCardBanner"
import { usePapayooStore } from "./store"
import { SwapCardBanner } from "./SwapCardBanner"

export function Banner() {
  const { phase, playerOrder, players } = usePapayooStore(store => store.state)

  const userId = useCurrentUserId()

  const isPlayer = userId !== null && playerOrder.includes(userId)

  if (!isPlayer || players[userId].ready) {
    return null
  }

  switch (phase) {
    case "playCard":
      return <PlayCardBanner />
    case "swapCard":
      return <SwapCardBanner />
    default:
      return null
  }
}
