import { useCallback } from "react"

import { Banner as CommonBanner } from "components/games/common/Banner"
import { AsyncButton } from "components/ui/AsyncButton"
import { replace } from "config/translations/replace"
import { useCurrentUserId } from "hooks/store/useCurrentUserId"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { playerAction } from "lib/api/client/playerAction"
import { getSwapCardCount } from "lib/games/papayoo/cards"
import { GameType } from "lib/games/types"

import { usePapayooStore } from "./store"

export function PlayCardBanner() {
  const t = useTranslations()

  const message = t.games.papayoo.banner.play

  return <CommonBanner>{message}</CommonBanner>
}

export function SwapCardBanner() {
  const { playerOrder } = usePapayooStore(store => store.state!)
  const { swap } = usePapayooStore(store => store.ui)
  const roomId = useRoomId()

  const t = useTranslations()

  const message = replace(t.games.papayoo.banner.swap, {
    count: getSwapCardCount(playerOrder.length),
  })

  const swapFull = swap.length === getSwapCardCount(playerOrder.length)

  const confirmSwap = useCallback(
    async () =>
      playerAction(GameType.PAPAYOO, roomId, "swapCard", { cards: swap }),
    [roomId, swap]
  )

  return (
    <CommonBanner>
      {message}
      <AsyncButton
        disabled={!swapFull}
        onClick={confirmSwap}
        translations={{
          label: "Confirm",
        }}
      />
    </CommonBanner>
  )
}

export function Banner() {
  const { phase, playerOrder, players } = usePapayooStore(store => store.state!)

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
