export type AnyKey = number | string | symbol
export type AnyPath = AnyKey[]

export type Path<T> = (any extends T ? true : false) extends true
  ? AnyPath
  :
      | []
      | (T extends any[]
          ? [number, ...Path<number>]
          : T extends Record<any, any>
          ? { [K in keyof T]-?: [K, ...Path<T[K]>] }[keyof T]
          : never)

export type Get<T, P extends AnyPath, D = undefined> = (
  any extends T ? true : false
) extends true
  ? T
  : P extends [infer K, ...infer R]
  ? R extends AnyPath
    ? K extends keyof T
      ? Get<T[K], R, D>
      : D
    : never
  : undefined extends T
  ? Exclude<T, undefined> | D
  : T

export function get<T, P extends Path<T>>(obj: T, path: P): Get<T, P>
export function get<T, P extends Path<T>, D>(
  obj: T,
  path: P,
  defaultValue: D
): Get<T, P, D>
export function get<T, P extends Path<T>, D>(
  obj: T,
  [key, ...path]: P,
  defaultValue?: D
) {
  if (obj === undefined) {
    return defaultValue
  }

  if (obj === null || key === undefined) {
    return obj
  }

  return get(obj[key as keyof T], path as Path<T[keyof T]>, defaultValue)
}
