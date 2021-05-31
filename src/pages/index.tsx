import React from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import Link from "components/ui/Link"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageContainer>
      <PageHeader title={t.home.pageTitle} />
      <PageContent>
        <Link href={ROUTES.roomList()}>Rooms</Link>
      </PageContent>
    </PageContainer>
  )
}
