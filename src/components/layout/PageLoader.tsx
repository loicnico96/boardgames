import React from "react"

import Spinner from "components/ui/Spinner"

export type PageLoaderProps = {
  message?: string
}

export default function PageLoader({ message }: PageLoaderProps) {
  return (
    <div>
      <Spinner size={96} />
      {!!message && <span>{message}</span>}
      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px 48px;
        }
      `}</style>
    </div>
  )
}

export function renderLoader(message?: string): JSX.Element {
  return <PageLoader message={message} />
}
