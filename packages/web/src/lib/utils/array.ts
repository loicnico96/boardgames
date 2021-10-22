import { isFunction } from "./types"

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
  mapFn: (value: T) => string
): void {
  array.sort((value, other) => mapFn(value).localeCompare(mapFn(other)))
}

export function remove<T>(array: ReadonlyArray<T>, value: T): Array<T> {
  return array.filter(item => item !== value)
}

export function sortByAlpha<T>(
  array: ReadonlyArray<T>,
  mapFn: (value: T) => string
): Array<T> {
  const clone = array.slice()
  mutableSortByAlpha(clone, mapFn)
  return clone
}

export function mutableSortBy<T>(
  array: Array<T>,
  mapFn: (value: T) => number
): void {
  array.sort((value, other) => mapFn(value) - mapFn(other))
}

export function sortBy<T>(
  array: ReadonlyArray<T>,
  mapFn: (value: T) => number
): Array<T> {
  const clone = array.slice()
  mutableSortBy(clone, mapFn)
  return clone
}
