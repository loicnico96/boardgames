export type ObjectKey = number | string
export type ObjectRecord<T = unknown> = Record<ObjectKey, T>
export type Key<T extends ObjectRecord> = Extract<keyof T, ObjectKey>
export type Value<T extends ObjectRecord> = T[Key<T>]

function parseKey(key: string): ObjectKey {
  const index = Number(key)
  return isNaN(index) ? key : index
}

export function keys<T extends ObjectRecord>(obj: T): Key<T>[] {
  return Object.keys(obj).map(parseKey) as Key<T>[]
}

export type ObjectMapFn<T extends ObjectRecord, U> = (
  value: Value<T>,
  key: Key<T>,
  obj: T
) => U

export function filter<T extends ObjectRecord>(
  obj: T,
  filterFn: ObjectMapFn<T, boolean>
): Partial<T> {
  return keys(obj).reduce((result, key) => {
    if (filterFn(obj[key], key, obj)) {
      result[key] = obj[key]
    }
    return result
  }, {} as Partial<T>)
}

export function mapValues<T extends ObjectRecord, U>(
  obj: T,
  mapFn: ObjectMapFn<T, U>
): Record<Key<T>, U> {
  return keys(obj).reduce((result, key) => {
    result[key] = mapFn(obj[key], key, obj)
    return result
  }, {} as Record<Key<T>, U>)
}

export type Merge<T extends ObjectRecord, U extends ObjectRecord> = {
  [K in Key<T> | Key<U>]: K extends Key<U>
    ? undefined extends U[K]
      ? K extends T[K]
        ? Exclude<U[K], undefined> | T[K]
        : U[K]
      : U[K]
    : T[K]
}

export function merge<T extends ObjectRecord, U extends ObjectRecord>(
  obj: T,
  src: U
): Merge<T, U> {
  return keys(src).reduce(
    (result, key) => {
      if (src[key] !== undefined) {
        result[key] = src[key] as Merge<T, U>[Key<U>]
      }
      return result
    },
    { ...obj } as Merge<T, U>
  )
}
