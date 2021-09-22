import { Link, LinkProps } from "@boardgames/components"
import NextLink from "next/link"

export function RouterLink({ children, href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  )
}
