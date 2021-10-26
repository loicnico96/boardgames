import { useCallback } from "react"

import { Banner } from "components/games/common/Banner"
import { AsyncButton } from "components/ui/AsyncButton"
import { replace } from "config/translations/replace"
import { usePlayerAction } from "hooks/usePlayerAction"
import { useTranslations } from "hooks/useTranslations"
import { getSwapCardCount } from "lib/games/papayoo/cards"
import { GameType } from "lib/games/types"

import { usePapayooStore } from "./store"

export function SwapCardBanner() {
  const { playerOrder } = usePapayooStore(store => store.state)
  const { swap } = usePapayooStore(store => store.ui)

  const t = useTranslations()

  const message = replace(t.games.papayoo.banner.swap, {
    count: getSwapCardCount(playerOrder.length),
  })

  const swapFull = swap.length === getSwapCardCount(playerOrder.length)

  const playerAction = usePlayerAction(GameType.PAPAYOO)

  const confirmSwap = useCallback(
    () => playerAction({ code: "swapCard", cards: swap }),
    [playerAction, swap]
  )

  return (
    <Banner>
      {message}
      <AsyncButton
        disabled={!swapFull}
        onClick={confirmSwap}
        translations={{
          label: "Confirm",
        }}
      />
    </Banner>
  )
}
