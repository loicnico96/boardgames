import styled from "@emotion/styled"
import { ComponentType } from "react"

import { Box, BoxProps } from "Components/Primitives/Box"
import { BaseLinkProps, Link } from "Components/Primitives/Link"

export type BreadcrumbsParent = {
  title: string
  path: string
}

export type BreadcrumbsProps = Omit<BoxProps, "children"> & {
  linkComponent?: ComponentType<BaseLinkProps>
  parents?: ReadonlyArray<BreadcrumbsParent>
  title: string
}

const Breadcrumb = styled.span`
  :not(:last-of-type)::after {
    content: ">";
    margin: 0px 8px;
  }
`

export function Breadcrumbs({
  linkComponent,
  parents = [],
  title,
  ...props
}: BreadcrumbsProps) {
  return (
    <Box {...props}>
      {parents.map(parent => (
        <Breadcrumb key={parent.path}>
          <Link component={linkComponent} href={parent.path}>
            {parent.title}
          </Link>
        </Breadcrumb>
      ))}
      <Breadcrumb>{title}</Breadcrumb>
    </Box>
  )
}
