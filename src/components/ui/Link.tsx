import NextLink from "next/link"
import React from "react"

export type HtmlAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export type LinkProps = HtmlAnchorProps & {
  children: React.ReactNode
  href: string
}

export default function Link({ children, href, ...props }: LinkProps) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}
