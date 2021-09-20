import styled from "@emotion/styled"

import { PageContent } from "Components/Layout/PageContent"
import { Text } from "Components/Typography/Text"

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
      <Text>Error: {error instanceof Error ? error.message : error}</Text>
    </PageErrorContainer>
  )
}

export function renderError(error: Error | string): JSX.Element {
  return <PageError error={error} />
}
