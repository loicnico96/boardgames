import PageError from "components/layout/PageError"
import PageLayout from "components/layout/PageLayout"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function NotFoundPage() {
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title="Are you lost?">
      <PageError error={Error("The page you're looking for doesn't exist.")} />
    </PageLayout>
  )
}
