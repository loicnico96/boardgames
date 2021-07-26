import styled from "@emotion/styled"

import { isError } from "lib/utils/error"

import PageContent from "./PageContent"

export type PageErrorProps = {
  error: Error | string
}

const PageErrorContainer = styled(PageContent)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function PageError({ error }: PageErrorProps) {
  return (
    <PageErrorContainer>
      <div>Error: {isError(error) ? error.message : error}</div>
    </PageErrorContainer>
  )
}

export function renderError(error: Error | string): JSX.Element {
  return <PageError error={error} />
}
