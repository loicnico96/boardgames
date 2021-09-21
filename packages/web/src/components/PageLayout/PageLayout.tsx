import {
  Breadcrumbs,
  BreadcrumbsProps,
  PageContainer,
  PageHeader,
  UserInfo,
} from "@boardgames/components"
import NextLink from "next/link"
import { ReactNode } from "react"

import { PageHead } from "./PageHead"

export type PageLayoutProps = BreadcrumbsProps & {
  children: ReactNode
}

export function PageLayout({ children, parents, title }: PageLayoutProps) {
  return (
    <PageContainer>
      <PageHead title={title} />
      <PageHeader>
        <Breadcrumbs
          flex={1}
          linkComponent={NextLink}
          parents={parents}
          title={title}
        />
        <UserInfo />
      </PageHeader>
      {children}
    </PageContainer>
  )
}
