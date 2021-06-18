import { randomInt } from "./math"
import { ObjectKey } from "./objects"
import { Fn, isFunction } from "./types"

export type Length<T extends unknown[]> = T["length"]

export type IntegerLessThan<
  I extends number,
  A extends unknown[] = []
> = Length<A> extends I ? never : Length<A> | IntegerLessThan<I, [...A, I]>

export type Indexes<A extends unknown[]> = number extends Length<A>
  ? number
  : {
      [I in Length<A>]: IntegerLessThan<I>
    }[Length<A>]

export type ArrayOfMinSize<
  T,
  I extends number,
  A extends unknown[] = []
> = I extends Length<A> ? [...A, ...T[]] : ArrayOfMinSize<T, I, [...A, T]>

export type ArrayOfSize<
  T,
  I extends number,
  A extends unknown[] = []
> = I extends Length<A> ? A : ArrayOfSize<T, I, [...A, T]>

export type ArrayValue<T extends unknown[]> = T[number]

export type ArrayMapFn<T, U> = (value: T, index: number, list: T[]) => U

export function fill<T>(length: number, value: (index: number) => T): T[]
export function fill<T>(length: number, value: Exclude<T, Fn>): T[]
export function fill<T>(length: number, value: T | ((index: number) => T)) {
  if (isFunction(value)) {
    return Array(length)
      .fill(undefined)
      .map((_, index) => value(index))
  } else {
    return Array<T>(length).fill(value)
  }
}

export function generate<T, K extends ObjectKey, U>(
  list: T[],
  generateFn: ArrayMapFn<T, [K, U]>
): Record<K, U> {
  return list.reduce((result, item, index) => {
    const [key, value] = generateFn(item, index, list)
    result[key] = value
    return result
  }, {} as Record<K, U>)
}

export function mutableShuffle<T>(list: T[]): void {
  for (let i = list.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    const x = list[i]
    list[i] = list[j]
    list[j] = x
  }
}

export function shuffle<T>(list: T[]): T[] {
  const result = [...list]
  mutableShuffle(result)
  return result
}

export function randomValue<T>(list: T[]): T {
  return list[randomInt(list.length)]
}
