import React, { ReactNode } from "react"

export type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return <div className="container">{children}</div>
}

export default Layout
