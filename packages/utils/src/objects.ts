/**
 * Keys of a record
 * @example Key<{ foo: number, bar: string }> // "foo" | "bar"
 */
export type Key<T extends Record<string, unknown>> = keyof T & string

/**
 * Values of a record
 * @example Value<{ foo: number, bar: string }> // number | string
 */
export type Value<T extends Record<string, unknown>> = T[keyof T]

/**
 * Object union differentiated by a discriminator
 * @example ObjectUnion<"type", { foo: { foo: number }, bar: { bar: string } }> // { type: "foo", foo: number } | { type: "bar", bar: string }
 */
export type ObjectUnion<
  P extends string,
  T extends Record<string, Record<string, unknown>>
> = { [K in Key<T>]: T[K] & { [L in P]: K } }[Key<T>]

/**
 * Generates a result by reducing over the entries of a record
 * @param record - Record object (will not be mutated)
 * @param reduceFn - Reducer (invoked for each entry, with value and key as parameters)
 * @param initialValue - Initial value
 * @returns The final result
 */
export function reduce<T extends Record<string, unknown>, R>(
  record: T,
  reduceFn: <K extends Key<T>>(result: R, value: T[K], key: K) => R,
  initialValue: R
): R {
  return Object.keys(record).reduce(
    (result, key: Key<T>) => reduceFn(result, record[key], key),
    initialValue
  )
}

/**
 * Filters the entries of a record
 * @param record - Record object (will not be mutated)
 * @param filterFn - Predicate (invoked for each entry, with value and key as parameters)
 * @returns A new record containing only the matching entries
 */
export function filter<T extends Record<string, unknown>>(
  record: T,
  filterFn: <K extends Key<T>>(value: T[K], key: K) => boolean
): Partial<T> {
  return reduce(
    record,
    (result, value, key) => {
      if (filterFn(value, key)) {
        result[key] = value
      }

      return result
    },
    {} as Partial<T>
  )
}

/**
 * Maps the values of a record
 * @param record - Record object (will not be mutated)
 * @param mapFn - Function returning a new value (invoked for each entry, with value and key as parameters)
 * @returns A new record with the same keys, but mapped values
 */
export function mapValues<T extends Record<string, unknown>, R>(
  record: T,
  mapFn: <K extends Key<T>>(value: T[K], key: K) => R
): Record<Key<T>, R> {
  return reduce(
    record,
    (result, value, key) => {
      result[key] = mapFn(value, key)
      return result
    },
    {} as Record<Key<T>, R>
  )
}

/**
 * Gets the number of entries in a record
 * @param record - Record object
 * @returns The number of entries in the record
 */
export function size<T extends Record<string, unknown>>(record: T): number {
  return Object.keys(record).length
}
