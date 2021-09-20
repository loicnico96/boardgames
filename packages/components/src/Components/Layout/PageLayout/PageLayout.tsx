import styled from "@emotion/styled"
import { ReactNode } from "react"

export type PageLayoutProps = {
  children: ReactNode
}

export const PageContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <PageContainer>
      {/* <PageHeader {...props} /> */}
      {/* <ErrorBoundary onError={handleGenericError} renderError={renderError}> */}
      {children}
      {/* </ErrorBoundary> */}
    </PageContainer>
  )
}
