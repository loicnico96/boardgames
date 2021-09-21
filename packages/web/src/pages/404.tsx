import { PageError } from "@boardgames/components"

import { PageLayout } from "components/PageLayout"
import { useTranslations } from "config/translations/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function NotFoundPage() {
  const t = useTranslations()

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title={t.notFound.pageTitle}>
      <PageError error={t.notFound.message} />
    </PageLayout>
  )
}
