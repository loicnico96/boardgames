import React from "react"

import { handleGenericError } from "lib/utils/error"

import ErrorBoundary from "./ErrorBoundary"
import { renderError } from "./PageError"

export type PageContainerProps = {
  children: React.ReactNode
}

export default function PageContent({ children }: PageContainerProps) {
  return (
    <ErrorBoundary renderError={renderError} onError={handleGenericError}>
      <div>{children}</div>
      <style jsx>{`
        div {
          padding: 24px 48px;
        }
      `}</style>
    </ErrorBoundary>
  )
}
