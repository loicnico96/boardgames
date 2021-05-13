import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export type BreadcrumbsParent = {
  title: string
  path: string
}

export type BreadcrumbsProps = {
  parents?: BreadcrumbsParent[]
  title: string
}

export default function Breadcrumbs({ parents = [], title }: BreadcrumbsProps) {
  const { asPath } = useRouter()

  return (
    <React.Fragment>
      {parents.map(parent => (
        <React.Fragment key={parent.path}>
          <Link href={parent.path}>
            <a>{parent.title}</a>
          </Link>
          <span>{">"}</span>
        </React.Fragment>
      ))}
      <Link href={asPath}>
        <a>{title}</a>
      </Link>
      <style jsx>{`
        span {
          margin: 0px 8px;
        }
      `}</style>
    </React.Fragment>
  )
}
