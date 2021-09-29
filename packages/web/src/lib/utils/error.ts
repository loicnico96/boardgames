import { toast } from "react-toastify"

import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"

import { Console } from "./logger"

export function getStatusMessage(status: HttpStatus): string {
  return (
    {
      [HttpStatus.OK]: "Success",
      [HttpStatus.NO_CONTENT]: "No content",
      [HttpStatus.BAD_REQUEST]: "Invalid request",
      [HttpStatus.NOT_AUTHENTICATED]: "Forbidden",
      [HttpStatus.NOT_AUTHORIZED]: "Forbidden",
      [HttpStatus.NOT_FOUND]: "Not found",
      [HttpStatus.METHOD_NOT_ALLOWED]: "Invalid request",
      [HttpStatus.FAILED_PRECONDITION]: "Invalid request",
      [HttpStatus.INTERNAL_ERROR]: "Internal error",
    }[status] ?? "Unknown error"
  )
}

export function handleGenericError(error: Error): void {
  Console.error(error)
  if (error instanceof ApiError) {
    toast.error(getStatusMessage(error.statusCode))
  } else {
    toast.error(error.message)
  }
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
