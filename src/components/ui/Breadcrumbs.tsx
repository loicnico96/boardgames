import styled from "@emotion/styled"

import { useLocation } from "hooks/useLocation"

import Link from "./Link"

export type BreadcrumbsParent = {
  title: string
  path: string
}

export type BreadcrumbsProps = {
  parents?: BreadcrumbsParent[]
  title: string
}

const Breadcrumb = styled.span`
  :not(:last-of-type)::after {
    content: ">";
    margin: 0px 8px;
  }
`

export default function Breadcrumbs({ parents = [], title }: BreadcrumbsProps) {
  const location = useLocation()

  return (
    <>
      {parents.map(parent => (
        <Breadcrumb key={parent.path}>
          <Link href={parent.path}>{parent.title}</Link>
        </Breadcrumb>
      ))}
      <Breadcrumb>
        <Link href={location}>{title}</Link>
      </Breadcrumb>
    </>
  )
}
