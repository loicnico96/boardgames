import React from "react"

import ErrorBoundary from "components/ui/ErrorBoundary"
import { handleGenericError } from "lib/utils/error"

import { renderError } from "./PageError"

export type PageContainerProps = {
  children: React.ReactNode
}

export default function PageContent({ children }: PageContainerProps) {
  return (
    <ErrorBoundary onError={handleGenericError} renderError={renderError}>
      <div>{children}</div>
      <style jsx>{`
        div {
          padding: 24px 48px;
        }
      `}</style>
    </ErrorBoundary>
  )
}
