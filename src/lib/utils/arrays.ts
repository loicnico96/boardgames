import { ObjectKey } from "./objects"

export type ArrayMapFn<T, U> = (value: T, index: number, list: T[]) => U

export function generate<T, K extends ObjectKey, U>(
  list: T[],
  generateFn: ArrayMapFn<T, [K, U]>
): Record<K, U> {
  return list.reduce((result, item, index) => {
    const [key, value] = generateFn(item, index, list)
    result[key] = value
    return result
  }, {} as Record<K, U>)
}
