import { PageContent } from "@boardgames/components"
import styled from "@emotion/styled"

import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "hooks/useTranslations"

const StyledPageContent = styled(PageContent)`
  display: flex;
  gap: 0px 48px;
`

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <StyledPageContent>{t.home.pageTitle}</StyledPageContent>
    </PageLayout>
  )
}
