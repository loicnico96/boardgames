import React from "react"
import styled from "styled-components"

import ErrorBoundary from "components/ui/ErrorBoundary"
import { handleGenericError } from "lib/utils/error"

import { renderError } from "./PageError"

export type PageContentProps = {
  children: React.ReactNode
  className?: string
}

function PageContent({ children, ...props }: PageContentProps) {
  return (
    <ErrorBoundary onError={handleGenericError} renderError={renderError}>
      <div {...props}>{children}</div>
    </ErrorBoundary>
  )
}

export default styled(PageContent)`
  padding: 24px 48px;
`
