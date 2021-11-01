import { Banner } from "components/ui/GameView/Banner"
import { useTranslations } from "hooks/useTranslations"

import { usePapayooPlayer } from "../store"

import { GameBannerProps } from "./GameBanner"

export function PlayCardBanner({ playerId }: GameBannerProps) {
  const t = useTranslations()

  const isReady = usePapayooPlayer(playerId, player => player.ready)

  if (isReady) {
    return null
  }

  return <Banner>{t.games.papayoo.banner.play.message}</Banner>
}
