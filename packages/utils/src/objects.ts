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
