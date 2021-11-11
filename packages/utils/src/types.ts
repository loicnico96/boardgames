export type Extends<A, B> = [A] extends [B] ? true : false
export type If<C extends boolean, A, B> = C extends true ? A : B
export type And<A extends boolean, B extends boolean> = If<A, B, false>
export type Or<A extends boolean, B extends boolean> = If<A, true, B>
export type Is<A, B> = And<Extends<A, B>, Extends<B, A>>
export type IsEmpty<A extends Record<any, any>> = Extends<A, Record<any, never>>
export type IsNever<A> = Extends<A, never>

export type Function<P extends any[] = any[], R = any> = (...args: P) => R

export function identity<T>(value: T): T {
  return value
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false
}

export function isError(value: unknown): value is Error {
  return value instanceof Error
}

export function isNumber(value: unknown): value is number {
  return Number.isFinite(value)
}

export function isEnum<T extends string>(
  value: unknown,
  enumObject: Record<string, T>
): value is T {
  return Object.values(enumObject).includes(value as T)
}

export function isFunction(value: unknown): value is Function {
  return typeof value === "function"
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]"
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}
