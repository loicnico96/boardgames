import React from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import { useTranslations } from "hooks/useTranslations"

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageContainer>
      <PageHeader title={t.home.pageTitle} />
      <PageContent>{t.home.pageTitle}</PageContent>
    </PageContainer>
  )
}
