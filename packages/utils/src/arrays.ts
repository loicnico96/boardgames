import { Function, isFunction } from "./types"

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

export function mutableSortByAlpha<T>(
  array: Array<T>,
  sortFn: (value: T) => string,
  sortDir: number = 1
): void {
  array.sort(
    (value, other) => sortFn(value).localeCompare(sortFn(other)) * sortDir
  )
}

export function remove<T>(array: ReadonlyArray<T>, value: T): Array<T> {
  return array.filter(item => item !== value)
}

export function sortByAlpha<T>(
  array: ReadonlyArray<T>,
  mapFn: (value: T) => string,
  sortDir: number = 1
): Array<T> {
  const clone = array.slice()
  mutableSortByAlpha(clone, mapFn, sortDir)
  return clone
}

export function mutableSortBy<T>(
  array: Array<T>,
  ...sortFns: ((value: T) => number)[]
): void {
  array.sort((value, other) => {
    for (const fn of sortFns) {
      const diff = fn(value) - fn(other)
      if (diff) {
        return diff
      }
    }

    return 0
  })
}

export function sortBy<T>(
  array: ReadonlyArray<T>,
  ...sortFns: ((value: T) => number)[]
): Array<T> {
  const clone = array.slice()
  mutableSortBy(clone, ...sortFns)
  return clone
}

export function unique<T>(array: ReadonlyArray<T>): Array<T> {
  return Array.from(new Set(array))
}
