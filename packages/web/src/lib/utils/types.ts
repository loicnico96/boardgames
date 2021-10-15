export type Extends<A, B> = [A] extends [B] ? true : false
export type If<C extends boolean, A, B> = C extends true ? A : B
export type And<A extends boolean, B extends boolean> = If<A, B, false>
export type Or<A extends boolean, B extends boolean> = If<A, true, B>
export type Is<A, B> = And<Extends<A, B>, Extends<B, A>>
export type IsEmpty<A extends Record<any, any>> = Extends<A, Record<any, never>>
export type IsNever<A> = Extends<A, never>

export type Fn<P extends any[] = any[], R = any> = (...args: P) => R

export function assert(
  condition: boolean,
  message: string = "Assertion failed"
): asserts condition {
  if (!condition) {
    throw Error(message)
  }
}

export function identity<T>(value: T): T {
  return value
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isBoolean(value: unknown): value is string {
  return typeof value === "string"
}

export function isNumber(value: unknown): value is number {
  return Number.isFinite(value)
}

export function isFunction(value: unknown): value is Function {
  return typeof value === "function"
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export type ObjectRecord<T> = Record<string, T>
export type Key<T extends ObjectRecord<unknown>> = keyof T
export type Value<T extends ObjectRecord<unknown>> = T[keyof T]

export type ObjectUnion<
  U extends string,
  T extends ObjectRecord<ObjectRecord<unknown>>
> = {
  [S in Key<T>]: {
    [K in Key<T[S]> | U]: K extends U ? S : T[S][K]
  }
}[Key<T>]
