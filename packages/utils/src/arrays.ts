import { Function, isFunction } from "./types"

export enum SortDirection {
  ASCENDING = 1,
  DESCENDING = -1,
}

export function count<T>(array: ReadonlyArray<T>, value: T): number {
  return array.filter(item => item === value).length
}

export function fill<T>(length: number, value: (index: number) => T): T[]
export function fill<T>(length: number, value: Exclude<T, Function>): T[]
export function fill<T>(length: number, value: T | ((index: number) => T)) {
  if (isFunction(value)) {
    return Array(length)
      .fill(undefined)
      .map((_, index) => value(index))
  }

  return Array<T>(length).fill(value)
}

export function generate<T, K extends string, R>(
  array: ReadonlyArray<T>,
  mapFn: (value: T, index: number, array: ReadonlyArray<T>) => [K, R]
): Record<K, R> {
  return array.reduce((result, value, index) => {
    const [k, v] = mapFn(value, index, array)
    result[k] = v
    return result
  }, {} as Record<K, R>)
}

export function remove<T>(array: ReadonlyArray<T>, value: T): Array<T> {
  return array.filter(item => item !== value)
}

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

export function sortByAlpha<T extends string>(
  array: ReadonlyArray<T>,
  sortDir?: SortDirection
): Array<T>
export function sortByAlpha<T>(
  array: ReadonlyArray<T>,
  sortFn: (value: T) => string,
  sortDir?: SortDirection
): Array<T>
export function sortByAlpha<T>(
  array: ReadonlyArray<T>,
  sortFnOrDir: ((value: T) => string) | SortDirection = SortDirection.ASCENDING,
  sortDir: SortDirection = SortDirection.ASCENDING
) {
  return array.slice().sort((value, other) => {
    if (isFunction(sortFnOrDir)) {
      return sortFnOrDir(value).localeCompare(sortFnOrDir(other)) * sortDir
    } else {
      return String(value).localeCompare(String(other)) * sortFnOrDir
    }
  })
}

export function unique<T>(array: ReadonlyArray<T>): Array<T> {
  return Array.from(new Set(array))
}
