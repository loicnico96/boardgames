export type ObjectKey = number | string
export type ObjectRecord<T = unknown> = Record<ObjectKey, T>
export type Key<T extends ObjectRecord> = Extract<keyof T, ObjectKey>
export type Value<T extends ObjectRecord> = T[Key<T>]

function parseKey(key: string): ObjectKey {
  return isNaN(Number(key)) ? key : Number(key)
}

export function keys<T extends ObjectRecord>(obj: T): Key<T>[] {
  return Object.keys(obj).map(parseKey) as Key<T>[]
}
