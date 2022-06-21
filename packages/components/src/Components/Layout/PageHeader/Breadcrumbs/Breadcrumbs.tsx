import styled from "@emotion/styled"
import { ComponentType } from "react"

import { Link, LinkProps } from "Components/Primitives/Link"
import { computeStyleProps, StyleProps } from "utils/style"

export type BreadcrumbsParent = {
  title: string
  path: string
}

export type BreadcrumbsProps = StyleProps & {
  linkComponent?: ComponentType<LinkProps>
  parents?: ReadonlyArray<BreadcrumbsParent>
  title: string
}

const BreadcrumbList = styled.ol`
  list-style: none;
  padding: 0;
`

const BreadcrumbListItem = styled.li`
  display: inline;
`

const BreadcrumbSeparator = styled.span`
  margin: 0px 8px;
`

export function Breadcrumbs(props: BreadcrumbsProps) {
  const {
    linkComponent: LinkComponent = Link,
    parents = [],
    title,
    ...styleProps
  } = computeStyleProps(props)

  return (
    <nav aria-label="Breadcrumbs" {...styleProps}>
      <BreadcrumbList>
        {parents.map(parent => (
          <BreadcrumbListItem key={parent.path}>
            <LinkComponent href={parent.path}>{parent.title}</LinkComponent>
            <BreadcrumbSeparator aria-hidden>{">"}</BreadcrumbSeparator>
          </BreadcrumbListItem>
        ))}
        <BreadcrumbListItem>
          <span aria-current="location">{title}</span>
        </BreadcrumbListItem>
      </BreadcrumbList>
    </nav>
  )
}
