import React, { Component } from "react"

import { isDev } from "lib/utils/debug"
import { ErrorHandler, toError } from "lib/utils/error"

export type ErrorComponentProps = {
  error: Error
}

export type ErrorBoundaryProps = {
  children: React.ReactNode
  onError?: ErrorHandler
  renderError?: (error: Error) => JSX.Element
}

export type ErrorBoundaryState = {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(rawError: unknown): ErrorBoundaryState {
    return { error: toError(rawError) }
  }

  componentDidCatch(rawError: unknown, errorInfo: unknown) {
    const { onError } = this.props

    if (isDev) {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary] Caught:", rawError, errorInfo)
    }

    if (onError) {
      onError(toError(rawError))
    }
  }

  render() {
    const { children, renderError } = this.props
    const { error } = this.state

    if (error !== null) {
      return renderError ? renderError(error) : error.message
    }

    return children
  }
}

export default ErrorBoundary
