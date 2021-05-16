import React from "react"

import PageLayout from "components/layout/PageLayout"
import { useTranslations } from "hooks/useTranslations"

export default function HomePage() {
  const t = useTranslations()

  return <PageLayout title={t.home.pageTitle}>{t.home.pageTitle}</PageLayout>
}
