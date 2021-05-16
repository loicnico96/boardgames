import React from "react"

import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { handleGenericError } from "lib/utils/error"

import ErrorBoundary from "./ErrorBoundary"
import PageContainer from "./PageContainer"
import PageContent from "./PageContent"
import { renderError } from "./PageError"
import PageHead from "./PageHead"
import PageHeader from "./PageHeader"

export type PageLayoutProps = {
  children: React.ReactNode
  parents?: BreadcrumbsParent[]
  title: string
}

export default function PageLayout({
  children,
  parents,
  title,
}: PageLayoutProps) {
  return (
    <PageContainer>
      <PageHead title={title} />
      <PageHeader parents={parents} title={title} />
      <ErrorBoundary renderError={renderError} onError={handleGenericError}>
        <PageContent>{children}</PageContent>
      </ErrorBoundary>
    </PageContainer>
  )
}
