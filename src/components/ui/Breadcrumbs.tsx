import React from "react"

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

export default function Breadcrumbs({ parents = [], title }: BreadcrumbsProps) {
  const location = useLocation()

  return (
    <div>
      {parents.map(parent => (
        <span key={parent.path}>
          <Link href={parent.path}>{parent.title}</Link>
        </span>
      ))}
      <span>
        <Link href={location}>{title}</Link>
      </span>
      <style jsx>{`
        div {
          flex: 1 1 auto;
        }
        span:not(:last-of-type)::after {
          content: ">";
          margin: 0px 8px;
        }
      `}</style>
    </div>
  )
}
