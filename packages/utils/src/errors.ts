import { isError, isString } from "./types"

export function raise(message: string): never {
  throw Error(message)
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    raise(message)
  }
}

export function toError(value: unknown): Error {
  if (isError(value)) {
    return value
  }

  if (isString(value)) {
    return Error(value)
  }

  return Object.assign(Error("Unknown error"), { originalError: value })
}
