import React from "react"

export type PageErrorProps = {
  error: Error
}

export default function PageError({ error }: PageErrorProps) {
  return (
    <div className="container">
      <div>Error: {error.message}</div>
      <style jsx>{`
        .container {
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
