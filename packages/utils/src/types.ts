/**
 * Whether A extends B
 * @example Extends<"foo", string> // true
 * @example Extends<string, "foo"> // false
 * @example Extends<"foo", "foo" | "bar"> // true
 * @example Extends<"foo" | "bar", "foo"> // false
 * @example Extends<string, unknown> // true
 * @example Extends<unknown, string> // false
 */
export type Extends<A, B> = [A] extends [B] ? true : false

/**
 * If C is true, then A, otherwise B
 * @example If<true, 1, 0> // 1
 * @example If<false, 1, 0> // 0
 * @example If<boolean, 1, 0> // 0 | 1
 */
export type If<C extends boolean, A, B> = C extends true ? A : B

/**
 * Whether both A and B are true
 * @example And<true, true> // true
 * @example And<true, false> // false
 * @example And<true, boolean> // boolean
 */
export type And<A extends boolean, B extends boolean> = If<A, B, false>

/**
 * Whether either A or B is true
 * @example Or<false, true> // true
 * @example Or<false, false> // false
 * @example Or<false, boolean> // boolean
 */
export type Or<A extends boolean, B extends boolean> = If<A, true, B>

/**
 * Whether A and B are the same type
 * @example Is<string, unknown> // false
 * @example Is<unknown, string> // false
 * @example Is<unknown, unknown> // true
 */
export type Is<A, B> = And<Extends<A, B>, Extends<B, A>>

/**
 * Whether A is an empty record
 * @example IsEmpty<{}> // true
 * @example IsEmpty<{ foo: string }> // false
 */
export type IsEmpty<A extends Record<any, any>> = Extends<A, Record<any, never>>

/**
 * Whether A is never
 */
export type IsNever<A> = Extends<A, never>

/**
 * Function with parameters P and return value R
 * @param args - Parameters
 * @returns Return type
 */
export type Function<P extends any[] = any[], R = any> = (...args: P) => R

/**
 * Identity function
 * @param value - Any value
 * @returns The given value
 */
export function identity<T>(value: T): T {
  return value
}

/**
 * Checks that given value is an array
 * @param value - Any value
 * @returns Whether the value is an array
 */
export function isArray(value: unknown): value is ReadonlyArray<unknown> {
  return Array.isArray(value)
}

/**
 * Checks that given value is true or false
 * @param value - Any value
 * @returns Whether the value is true or false
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false
}

/**
 * Checks that given value is an Error object
 * @param value - Any value
 * @returns Whether the value is an instance of Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error
}

/**
 * Checks that given value is a finite number
 * @param value - Any value
 * @returns Whether the value is a finite number
 * @example isNumber(3.14) // true
 * @example isNumber("3.14") // false
 * @example isNumber(NaN) // false
 * @example isNumber(+Infinity) // false
 * @example isNumber(-Infinity) // false
 */
export function isNumber(value: unknown): value is number {
  return Number.isFinite(value)
}

/**
 * Checks that given value is an enum member
 * @remarks Only string enums are accepted.
 * @param value - Any value
 * @param enumObject - Enum object
 * @returns Whether the value is a member of given enum
 */
export function isEnum<T extends string>(
  value: unknown,
  enumObject: Record<string, T>
): value is T {
  return Object.values(enumObject).includes(value as T)
}

/**
 * Checks that given value is a function
 * @param value - Any value
 * @returns Whether the value is a function
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === "function"
}

/**
 * Checks that given value is a record
 * @param value - Any value
 * @returns Whether the value is a record
 * @example isRecord({ a: 1 }) // true
 * @example isRecord([1, 2, 3]) // false
 * @example isRecord(new Date()) // false
 * @example isRecord(new Map()) // false
 * @example isRecord(new Set()) // false
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]"
}

/**
 * Checks that given value is a string
 * @param value - Any value
 * @returns Whether the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string"
}
