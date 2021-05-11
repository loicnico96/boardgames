import React from "react"

import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
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