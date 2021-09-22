import styled from "@emotion/styled"
import { ComponentType } from "react"

import { Box, BoxProps } from "Components/Primitives/Box"
import { Link, LinkProps } from "Components/Primitives/Link"

export type BreadcrumbsParent = {
  title: string
  path: string
}

export type BreadcrumbsProps = Omit<BoxProps, "children"> & {
  linkComponent?: ComponentType<LinkProps>
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
  linkComponent: LinkComponent = Link,
  parents = [],
  title,
  ...props
}: BreadcrumbsProps) {
  return (
    <Box {...props}>
      {parents.map(parent => (
        <Breadcrumb key={parent.path}>
          <LinkComponent href={parent.path}>{parent.title}</LinkComponent>
        </Breadcrumb>
      ))}
      <Breadcrumb>{title}</Breadcrumb>
    </Box>
  )
}
