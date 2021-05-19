import React from "react"

export type PageErrorProps = {
  error: Error
}

export default function PageError({ error }: PageErrorProps) {
  return (
    <div>
      <span>Error: {error.message}</span>
      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          justify-content: center;
          padding: 24px 48px;
        }
      `}</style>
    </div>
  )
}

export function renderError(error: Error): JSX.Element {
  return <PageError error={error} />
}
