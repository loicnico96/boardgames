import { toast } from "react-toastify"

import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"

import { Console } from "./logger"

export function getErrorMessage(error: Error): string {
  if (error instanceof ApiError) {
    return (
      {
        [HttpStatus.OK]: "Success",
        [HttpStatus.NO_CONTENT]: "No content",
        [HttpStatus.BAD_REQUEST]: "Invalid request",
        [HttpStatus.NOT_AUTHENTICATED]: "Not authenticated",
        [HttpStatus.NOT_AUTHORIZED]: error.message,
        [HttpStatus.NOT_FOUND]: "Not found",
        [HttpStatus.METHOD_NOT_ALLOWED]: "Invalid request",
        [HttpStatus.FAILED_PRECONDITION]: error.message,
        [HttpStatus.INTERNAL_ERROR]: "Internal error",
      }[error.statusCode] ?? "Unknown error"
    )
  }

  return error.message
}

export function handleGenericError(error: Error): void {
  Console.error(error)
  toast.error(getErrorMessage(error))
}

export function isError(value: unknown): value is Error {
  return value instanceof Error
}

export function toError(value: unknown): Error {
  if (isError(value)) {
    return value
  }

  if (typeof value === "string") {
    return Error(value)
  }

  return Object.assign(Error("Unknown"), { originalError: value })
}
