export type Key<T extends Record<string, unknown>> = keyof T
export type Value<T extends Record<string, unknown>> = T[keyof T]

export type ObjectUnion<
  U extends string,
  T extends Record<string, Record<string, unknown>>
> = {
  [S in Key<T>]: T[S] & {
    [K in U]: S
  }
}[Key<T>]

export function reduce<T extends Record<string, unknown>, R>(
  obj: T,
  reduceFn: (result: R, value: Value<T>, key: Key<T>) => R,
  initialValue: R
): R {
  return Object.keys(obj).reduce(
    (result, key: Key<T>) => reduceFn(result, obj[key], key),
    initialValue
  )
}

export function filter<T extends Record<string, unknown>>(
  obj: T,
  filterFn: (value: Value<T>, key: Key<T>) => boolean
): Partial<T> {
  return reduce(
    obj,
    (result, value, key) => {
      if (filterFn(value, key)) {
        result[key] = value
      }

      return result
    },
    {} as Partial<T>
  )
}

export function mapValues<T extends Record<string, unknown>, R>(
  obj: T,
  mapFn: (value: Value<T>, key: Key<T>) => R
): Record<Key<T>, R> {
  return reduce(
    obj,
    (result, value, key) => {
      result[key] = mapFn(value, key)
      return result
    },
    {} as Record<Key<T>, R>
  )
}

export function size<T extends Record<string, unknown>>(obj: T): number {
  return Object.keys(obj).length
}
