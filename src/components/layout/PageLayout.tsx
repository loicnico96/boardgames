import styled from "@emotion/styled"
import { ReactNode } from "react"

import ErrorBoundary from "components/ui/ErrorBoundary"
import { handleGenericError } from "lib/utils/error"

import { renderError } from "./PageError"
import PageHeader, { PageHeaderProps } from "./PageHeader"

export type PageLayoutProps = PageHeaderProps & {
  children: ReactNode
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
