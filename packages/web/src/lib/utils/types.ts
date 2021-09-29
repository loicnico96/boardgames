export type Extends<A, B> = [A] extends [B] ? true : false
export type If<C extends boolean, A, B> = C extends true ? A : B
export type And<A extends boolean, B extends boolean> = If<A, B, false>
export type Or<A extends boolean, B extends boolean> = If<A, true, B>
export type Is<A, B> = And<Extends<A, B>, Extends<B, A>>
export type IsEmpty<A extends Record<any, any>> = Extends<A, Record<any, never>>
export type IsNever<A> = Extends<A, never>

export type Fn<P extends any[] = any[], R = any> = (...args: P) => R

export function identity<T>(value: T): T {
  return value
}
