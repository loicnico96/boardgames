import { Link, LinkProps } from "@boardgames/components"
import NextLink from "next/link"

export function RouterLink({ children, ...props }: LinkProps) {
  return (
    <NextLink href={props.href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  )
}
