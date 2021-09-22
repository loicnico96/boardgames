import styled from "@emotion/styled"
import { ReactNode } from "react"

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  href: string
}

export const Link = styled.a<LinkProps>`
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
