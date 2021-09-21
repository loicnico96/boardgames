import {
  Breadcrumbs,
  BreadcrumbsProps,
  PageContainer,
  PageHeader,
} from "@boardgames/components"
import NextLink from "next/link"
import { ReactNode } from "react"

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
          linkComponent={NextLink}
          parents={parents}
          title={title}
        />
        <UserProfile />
      </PageHeader>
      {children}
    </PageContainer>
  )
}
