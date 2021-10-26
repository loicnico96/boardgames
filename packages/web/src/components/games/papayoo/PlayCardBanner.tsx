import { Banner } from "components/games/common/Banner"
import { useTranslations } from "hooks/useTranslations"

export function PlayCardBanner() {
  const t = useTranslations()

  return <Banner>{t.games.papayoo.banner.play}</Banner>
}
