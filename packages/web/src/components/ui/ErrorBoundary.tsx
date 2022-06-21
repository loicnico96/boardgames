import { toError } from "@boardgames/utils"
import { Component, ReactNode } from "react"

export type ErrorBoundaryProps = {
  children: ReactNode
  onError?: (error: Error) => void
  renderError?: (error: Error) => JSX.Element
}

export type ErrorBoundaryState = {
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(rawError: unknown): ErrorBoundaryState {
    return { error: toError(rawError) }
  }

  componentDidCatch(rawError: unknown) {
    const { onError } = this.props

    if (onError) {
      onError(toError(rawError))
    }
  }

  render() {
    const { children, renderError } = this.props
    const { error } = this.state

    if (error) {
      return renderError ? renderError(error) : error.message
    }

    return children
  }
}
