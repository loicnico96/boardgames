import { Text, PageContent } from "@boardgames/components"

import { PageLayout } from "components/ui/PageLayout"
import { RouterLink } from "components/ui/RouterLink"
import { useTranslations } from "config/translations/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <PageContent>
        <Text>
          <RouterLink href={ROUTES.login()}>{t.login.pageTitle}</RouterLink>
        </Text>
        <Text>
          <RouterLink href={ROUTES.roomList()}>
            {t.roomList.pageTitle}
          </RouterLink>
        </Text>
      </PageContent>
    </PageLayout>
  )
}
