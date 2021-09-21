import {
  Breadcrumbs,
  BreadcrumbsProps,
  PageContainer,
  PageHeader,
  UserInfo,
} from "@boardgames/components"
import NextLink from "next/link"
import { ReactNode } from "react"

export type PageLayoutProps = BreadcrumbsProps & {
  children: ReactNode
}

export function PageLayout({ children, parents, title }: PageLayoutProps) {
  return (
    <PageContainer>
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
