import { toast } from "react-toastify"

export type ErrorHandler = (error: Error) => void

export function handleGenericError(error: Error): void {
  console.error(error)
  toast.error(error.message)
}

export function isError(error: unknown): error is Error {
  return error instanceof Error
}

export function toError(error: unknown): Error {
  if (isError(error)) {
    return error
  }

  if (typeof error === "string") {
    return Error(error)
  }

  const message = `Unexpected error value: ${String(error)}`
  return Object.assign(Error(message), { originalValue: error })
}
