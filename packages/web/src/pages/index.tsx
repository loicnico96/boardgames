import { Text, PageContent, Link } from "@boardgames/components"
import NextLink from "next/link"

import { PageLayout } from "components/PageLayout"
import { useTranslations } from "config/translations/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <PageContent>
        <Text>
          <Link component={NextLink} href={ROUTES.login()}>
            {t.login.pageTitle}
          </Link>
        </Text>
        <Text>
          <Link component={NextLink} href={ROUTES.roomList()}>
            {t.roomList.pageTitle}
          </Link>
        </Text>
      </PageContent>
    </PageLayout>
  )
}
