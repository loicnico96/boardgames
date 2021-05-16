import React from "react"
export type PageContainerProps = {
  children: React.ReactNode
}

export default function PageContent({ children }: PageContainerProps) {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          padding: 24px 48px;
        }
      `}</style>
    </div>
  )
}
