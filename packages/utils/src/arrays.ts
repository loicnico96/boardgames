import { isFunction } from "./types"

/**
 * Sort direction
 */
export enum SortDir {
  /**
   * Ascending order
   */
  ASC = 1,
  /**
   * Descending order
   */
  DESC = -1,
}

/**
 * Counts the number of items matching given predicate inside an array
 * @param array - Array
 * @param filterFn - Predicate (invoked for each array item, with the value as parameter)
 * @returns The number of matching items
 */
export function count<T>(
  array: ReadonlyArray<T>,
  filterFn: (value: T) => boolean
): number
/**
 * Counts the number of occurrences of given value inside an array
 * @param array - Array
 * @param value - Value to match (using strict equality)
 * @returns The number of occurrences
 */
export function count<T>(array: ReadonlyArray<T>, value: T): number
export function count<T>(
  array: ReadonlyArray<T>,
  valueOrFilterFn: T | ((value: T) => boolean)
): number {
  return array.filter(item =>
    isFunction(valueOrFilterFn)
      ? valueOrFilterFn(item)
      : item === valueOrFilterFn
  ).length
}

/**
 * Generates an array of given length filled with a function
 * @param length - Length of the array
 * @param mapFn - Function returning any value (invoked for each index, with the index as parameter)
 * @returns The generated array
 */
export function fill<T>(length: number, mapFn: (index: number) => T): T[]
/**
 * Generates an array of given length filled with a value
 * @param length - Length of the array
 * @param value - Value to fill the array with
 * @returns The generated array
 */
export function fill<T>(length: number, value: T): T[]
export function fill<T>(
  length: number,
  valueOrMapFn: T | ((index: number) => T)
): T[] {
  return Array(length)
    .fill(undefined)
    .map((_, index) =>
      isFunction(valueOrMapFn) ? valueOrMapFn(index) : valueOrMapFn
    )
}

/**
 * Generates a record by mapping over an array
 * @param array - Array
 * @param mapFn - Function returning a [key, value] tuple (invoked for each array item, with value as parameter)
 * @returns The generated record
 */
export function generate<T, K extends string, R>(
  array: ReadonlyArray<T>,
  mapFn: (value: T) => [K, R]
): Record<K, R> {
  return array.reduce((result, value) => {
    const [k, v] = mapFn(value)
    result[k] = v
    return result
  }, {} as Record<K, R>)
}

/**
 * Removes all items matching given predicate from an array
 * @param array - Array (will not be mutated)
 * @param filterFn - Predicate (invoked for each array item, with the value as parameter)
 * @returns A copy of the array, without the matching items
 */
export function remove<T>(
  array: ReadonlyArray<T>,
  filterFn: (value: T) => boolean
): Array<T>
/**
 * Removes all occurrences of given value from an array
 * @param array - Array (will not be mutated)
 * @param value - Value to match (using strict equality)
 * @returns A copy of the array, without the matching items
 */
export function remove<T>(array: ReadonlyArray<T>, value: T): Array<T>
export function remove<T>(
  array: ReadonlyArray<T>,
  valueOrFilterFn: T | ((value: T) => boolean)
): Array<T> {
  return array.filter(item =>
    isFunction(valueOrFilterFn)
      ? !valueOrFilterFn(item)
      : item !== valueOrFilterFn
  )
}

/**
 * Sorts an array in numerical order (ascending)
 * @param array - Array (will not be mutated)
 * @param sortFns - Any number of functions each returning a number (invoked for each item, with value as parameter, in the order they are provided)
 * @returns A copy of the array, sorted
 */
export function sortBy<T>(
  array: ReadonlyArray<T>,
  ...sortFns: ((value: T) => number)[]
): Array<T> {
  return array.slice().sort((value, other) => {
    for (const fn of sortFns) {
      const diff = fn(value) - fn(other)
      if (diff) {
        return diff
      }
    }

    return 0
  })
}

/**
 * Sorts an array in lexical order
 * @param array - Array (will not be mutated)
 * @param sortFn - Function returning a string (invoked for each item, with value as parameter)
 * @param sortDir - Sort direction, ascending or descending (ascending by default)
 * @returns A copy of the array, sorted
 */
export function sortByAlpha<T>(
  array: ReadonlyArray<T>,
  sortFn: (value: T) => string,
  sortDir?: SortDir
): Array<T>
/**
 * Sorts an array of strings in lexical order
 * @param array - Array (will not be mutated)
 * @param sortDir - Sort direction, ascending or descending (ascending by default)
 * @returns A copy of the array, sorted
 */
export function sortByAlpha<T extends string>(
  array: ReadonlyArray<T>,
  sortDir?: SortDir
): Array<T>
export function sortByAlpha<T>(
  array: ReadonlyArray<T>,
  sortFnOrDir: ((value: T) => string) | SortDir = 1,
  sortDir: SortDir = 1
) {
  return array
    .slice()
    .sort((value, other) =>
      isFunction(sortFnOrDir)
        ? sortFnOrDir(value).localeCompare(sortFnOrDir(other)) * sortDir
        : String(value).localeCompare(String(other)) * sortFnOrDir
    )
}

/**
 * Removes duplicates from an array
 * @param array - Array (will not be mutated)
 * @returns A copy of the array, without duplicates
 */
export function unique<T>(array: ReadonlyArray<T>): Array<T> {
  return Array.from(new Set(array))
}
