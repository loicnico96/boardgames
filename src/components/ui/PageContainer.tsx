import React from "react"

export type PageContainerProps = {
  children: React.ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="PageContainer">
      {children}
      <style jsx>{`
        .PageContainer {
          background-color: #eee;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }
      `}</style>
    </div>
  )
}
