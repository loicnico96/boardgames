import { Banner } from "components/games/common/Banner"
import { AsyncButton } from "components/ui/AsyncButton"
import { replace } from "config/translations/replace"
import { useTranslations } from "hooks/useTranslations"
import { getSwapCardCount } from "lib/games/papayoo/cards"

import { usePapayooPlayer, usePapayooState } from "../store"

import { GameBannerProps } from "./GameBanner"
import { useConfirmSwap } from "./useConfirmSwap"

export function SwapCardBanner({ playerId }: GameBannerProps) {
  const t = useTranslations()

  const isReady = usePapayooPlayer(playerId, player => player.ready)

  const playerCount = usePapayooState(state => state.playerOrder.length)

  const [confirmSwap, confirmSwapDisabled] = useConfirmSwap()

  if (isReady) {
    return <Banner>{t.games.papayoo.banner.swap.ready}</Banner>
  }

  const message = replace(t.games.papayoo.banner.swap.message, {
    count: getSwapCardCount(playerCount),
  })

  return (
    <Banner>
      {message}
      <AsyncButton
        disabled={confirmSwapDisabled}
        onClick={confirmSwap}
        translations={t.games.papayoo.banner.swap.actions.confirm}
      />
    </Banner>
  )
}
