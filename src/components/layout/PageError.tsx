import React from "react"
import styled from "styled-components"

import PageContent from "./PageContent"

export type PageErrorProps = {
  error: Error
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
      <div>Error: {error.message}</div>
    </PageErrorContainer>
  )
}

export function renderError(error: Error): JSX.Element {
  return <PageError error={error} />
}
