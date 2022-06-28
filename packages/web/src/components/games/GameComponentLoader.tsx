import { PageLoader } from "@boardgames/components"

import { useTranslations } from "hooks/useTranslations"

export function GameComponentLoader() {
  const t = useTranslations()
  return <PageLoader message={t.game.pageLoading} />
}
