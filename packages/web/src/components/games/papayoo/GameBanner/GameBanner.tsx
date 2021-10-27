import { usePapayooState } from "../store"

import { PlayCardBanner } from "./PlayCardBanner"
import { SwapCardBanner } from "./SwapCardBanner"

export type GameBannerProps = {
  playerId: string
}

export function GameBanner({ playerId }: GameBannerProps) {
  const phase = usePapayooState(state => state.phase)

  switch (phase) {
    case "playCard":
      return <PlayCardBanner playerId={playerId} />

    case "swapCard":
      return <SwapCardBanner playerId={playerId} />

    default:
      return null
  }
}
