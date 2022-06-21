import {
  Breadcrumbs,
  BreadcrumbsProps,
  PageContainer,
  PageHeader,
  renderError,
} from "@boardgames/components"
import { ReactNode } from "react"

import { ErrorBoundary } from "components/ui/ErrorBoundary"
import { RouterLink } from "components/ui/RouterLink"

import { PageHead } from "./PageHead"
import { UserProfile } from "./UserProfile"

export type PageLayoutProps = BreadcrumbsProps & {
  children: ReactNode
}

export function PageLayout({ children, parents, title }: PageLayoutProps) {
  return (
    <PageContainer>
      <PageHeader>
        <PageHead title={title} />
        <Breadcrumbs
          flex={1}
          linkComponent={RouterLink}
          parents={parents}
          title={title}
        />
        <UserProfile />
      </PageHeader>
      <ErrorBoundary renderError={renderError}>{children}</ErrorBoundary>
    </PageContainer>
  )
}
