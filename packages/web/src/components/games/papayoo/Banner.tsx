import { Banner as CommonBanner } from "components/games/common/Banner"
import { useCurrentUserId } from "hooks/store/useCurrentUserId"
import { useGameState } from "hooks/useGameState"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"
import { identity } from "lib/utils/types"

export function Banner() {
  const { playerOrder, players } = useGameState(GameType.PAPAYOO, identity)

  const userId = useCurrentUserId()

  const isPlayer = userId !== null && playerOrder.includes(userId)

  const t = useTranslations()

  if (!isPlayer || players[userId].ready) {
    return null
  }

  return <CommonBanner>{t.games.papayoo.banner.play}</CommonBanner>
}
