import PageLoader from "components/layout/PageLoader"
import { useTranslations } from "hooks/useTranslations"

export default function GameComponentLoader() {
  const t = useTranslations()
  return <PageLoader message={t.gamePage.pageLoading} />
}
