import { isError, isString } from "./types"

/**
 * Asserts that a condition is verified
 * @param condition - Condition to assert
 * @param message - Error message if assertion fails
 * @throws Error if condition is false
 */
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw Error(message)
  }
}

/**
 * Converts any value to a proper Error object
 * @param value - Any value
 * @throws Error object representing the given value
 */
export function toError(value: unknown): Error & { originalError?: unknown } {
  if (isError(value)) {
    return value
  }

  if (isString(value)) {
    return Error(value)
  }

  return Object.assign(Error("Unknown error"), { originalError: value })
}
