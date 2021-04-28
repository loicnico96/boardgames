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
      <div className="PageContent">{children}</div>
      <style jsx>{`
        .PageContent {
          padding: 24px 48px;
        }
      `}</style>
    </ErrorBoundary>
  )
}
