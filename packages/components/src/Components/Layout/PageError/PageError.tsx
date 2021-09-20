import styled from "@emotion/styled"

import { PageContent } from "Components/Layout/PageContent"

export type PageErrorProps = {
  error: Error | string
}

const PageErrorContainer = styled(PageContent)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export function PageError({ error }: PageErrorProps) {
  return (
    <PageErrorContainer>
      <div>Error: {error instanceof Error ? error.message : error}</div>
    </PageErrorContainer>
  )
}

export function renderError(error: Error | string): JSX.Element {
  return <PageError error={error} />
}
