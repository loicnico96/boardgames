import { PageContent } from "@boardgames/components"
import styled from "@emotion/styled"

import { PageLayout } from "components/ui/PageLayout"

const StyledPageContent = styled(PageContent)`
  display: flex;
  gap: 0px 48px;
`

export default function HomePage() {
  return (
    <PageLayout title="Homepage">
      <StyledPageContent>Hello World!</StyledPageContent>
    </PageLayout>
  )
}
