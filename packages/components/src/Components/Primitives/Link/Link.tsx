import { ComponentType, ReactNode } from "react"

export type HtmlAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export type BaseLinkProps = {
  children: ReactNode
  href: string
}

export type LinkComponent = ComponentType<BaseLinkProps>

export type LinkProps = HtmlAnchorProps &
  BaseLinkProps & {
    component?: LinkComponent
  }

export function Link({ children, component, href, ...props }: LinkProps) {
  if (component) {
    const Component = component

    return (
      <Component href={href}>
        <a {...props}>{children}</a>
      </Component>
    )
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
