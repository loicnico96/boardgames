import React from "react"
import styled from "styled-components"

import ErrorBoundary from "components/ui/ErrorBoundary"
import { handleGenericError } from "lib/utils/error"

import { renderError } from "./PageError"
import PageHeader, { PageHeaderProps } from "./PageHeader"

export type PageLayoutProps = PageHeaderProps & {
  children: React.ReactNode
}

export const PageContainer = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

export default function PageLayout({ children, ...props }: PageLayoutProps) {
  return (
    <PageContainer>
      <PageHeader {...props} />
      <ErrorBoundary onError={handleGenericError} renderError={renderError}>
        {children}
      </ErrorBoundary>
    </PageContainer>
  )
}
