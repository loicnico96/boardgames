import { keys } from "./objects"
import { isString } from "./types"

export type EnumKey = string
export type EnumValue = number | string
export type Enum<E extends EnumValue, K extends EnumKey> = Record<K, E> & {
  [index: number]: string
}

export function enumKeys<E extends EnumValue, K extends EnumKey>(
  enumObj: Enum<E, K>
): K[] {
  return keys(enumObj).filter(isString) as K[]
}

export function enumValues<E extends EnumValue, K extends EnumKey>(
  enumObj: Enum<E, K>
): E[] {
  return enumKeys(enumObj).map(key => enumObj[key])
}

export function isEnum<E extends EnumValue, K extends EnumKey>(
  value: unknown,
  enumObj: Enum<E, K>
): value is E {
  return enumKeys(enumObj).some(key => enumObj[key] === value)
}
