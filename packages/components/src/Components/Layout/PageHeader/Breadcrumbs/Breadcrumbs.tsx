import styled from "@emotion/styled"

import { Box, BoxProps } from "Components/Primitives/Box"

export type BreadcrumbsParent = {
  title: string
  path: string
}

export type BreadcrumbsProps = Omit<BoxProps, "children"> & {
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
  parents = [],
  title,
  ...props
}: BreadcrumbsProps) {
  return (
    <Box {...props}>
      {parents.map(parent => (
        <Breadcrumb key={parent.path}>
          <a href={parent.path}>{parent.title}</a>
        </Breadcrumb>
      ))}
      <Breadcrumb>{title}</Breadcrumb>
    </Box>
  )
}
