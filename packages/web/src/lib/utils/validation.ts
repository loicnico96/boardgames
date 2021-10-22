import { toError } from "./error"
import {
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
  ObjectUnion,
} from "./types"

export type Validator<T> = (value: unknown) => T

export function any(): Validator<unknown> {
  return value => value
}

export function array<T>(
  validator: Validator<T>,
  options: {
    custom?: (value: T[]) => void
    length?: number
    maxLength?: number
    minLength?: number
    unique?: boolean
  } = {}
): Validator<T[]> {
  return value => {
    if (!isArray(value)) {
      throw Error("Not an array")
    }

    if (options.length !== undefined && options.length !== value.length) {
      throw Error(`Array must contain exactly ${options.length} elements`)
    }

    if (options.maxLength !== undefined && options.maxLength > value.length) {
      throw Error(`Array contains more than ${options.maxLength} elements`)
    }

    if (options.minLength !== undefined && options.minLength > value.length) {
      throw Error(`Array contains less than ${options.minLength} elements`)
    }

    if (options.unique && value.length !== new Set(value).size) {
      throw Error("Array contains duplicate elements")
    }

    for (let index = 0; index < value.length; index++) {
      try {
        validator(value[index])
      } catch (error) {
        throw Error(`Invalid index ${index} - ${toError(error).message}`)
      }
    }

    if (options.custom) {
      options.custom(value as T[])
    }

    return value as T[]
  }
}

export function boolean(
  options: {
    custom?: (value: boolean) => void
  } = {}
): Validator<boolean> {
  return value => {
    if (!isBoolean(value)) {
      throw Error("Not a boolean")
    }

    if (options.custom) {
      options.custom(value)
    }

    return value
  }
}

export function float(
  options: {
    custom?: (value: number) => void
    max?: number
    min?: number
  } = {}
): Validator<number> {
  return value => {
    if (!isNumber(value)) {
      throw Error("Not a number")
    }

    if (options.max !== undefined && options.max > value) {
      throw Error(`Value is greater than ${options.max}`)
    }

    if (options.min !== undefined && options.min > value) {
      throw Error(`Value is less than ${options.max}`)
    }

    if (options.custom) {
      options.custom(value)
    }

    return value
  }
}

export function integer(
  options: {
    custom?: (value: number) => void
    max?: number
    min?: number
  } = {}
): Validator<number> {
  return value => {
    if (!isNumber(value) || !Number.isInteger(value)) {
      throw Error("Not an integer")
    }

    if (options.max !== undefined && options.max > value) {
      throw Error(`Value is greater than ${options.max}`)
    }

    if (options.min !== undefined && options.min > value) {
      throw Error(`Value is less than ${options.max}`)
    }

    if (options.custom) {
      options.custom(value)
    }

    return value
  }
}

export function nullable<T>(validator: Validator<T>): Validator<T | null> {
  return value => {
    if (value === null) {
      return null
    }

    return validator(value)
  }
}

export function object<T extends Record<string, unknown>>(
  validators: {
    [K in keyof T]: Validator<T[K]>
  },
  options: {
    custom?: (value: T) => void
    extraKeys?: boolean
  } = {}
): Validator<T> {
  return value => {
    if (!isObject(value)) {
      throw Error("Not an object")
    }

    for (const key in validators) {
      try {
        validators[key](value[key])
      } catch (error) {
        if (value[key] === undefined) {
          throw Error(`Missing key '${key}'`)
        } else {
          throw Error(`Invalid key '${key}' - ${toError(error).message}`)
        }
      }
    }

    if (!options.extraKeys) {
      for (const key in value) {
        if (!validators[key]) {
          throw Error(`Object contains unknown key '${key}'`)
        }
      }
    }

    if (options.custom) {
      options.custom(value as T)
    }

    return value as T
  }
}

export function objectUnion<
  U extends string,
  T extends Record<string, Record<string, unknown>>
>(
  unionKey: U,
  unionValidators: {
    [K in keyof T]: {
      [L in keyof T[K]]: Validator<T[K][L]>
    }
  },
  options: {
    custom?: (value: ObjectUnion<U, T>) => void
    extraKeys?: boolean
  } = {}
): Validator<ObjectUnion<U, T>> {
  return value => {
    if (!isObject(value)) {
      throw Error("Not an object")
    }

    const unionType = value[unionKey]

    if (!isString(unionType)) {
      throw Error(`Missing union key '${unionKey}'`)
    }

    const validators = unionValidators[unionType]

    if (!validators) {
      throw Error(`Invalid union key '${unionKey}'`)
    }

    for (const key in validators) {
      try {
        validators[key](value[key])
      } catch (error) {
        if (value[key] === undefined) {
          throw Error(`Missing key '${key}'`)
        } else {
          throw Error(`Invalid key '${key}' - ${toError(error).message}`)
        }
      }
    }

    if (!options.extraKeys) {
      for (const key in value) {
        if (!validators[key] && key !== unionKey) {
          throw Error(`Object contains unknown key '${key}'`)
        }
      }
    }

    if (options.custom) {
      options.custom(value as ObjectUnion<U, T>)
    }

    return value as ObjectUnion<U, T>
  }
}

export function oneOf<T extends Validator<any>[]>(
  ...validators: T
): Validator<ReturnType<T[number]>> {
  return value => {
    const errors: string[] = []

    for (const validator of validators) {
      try {
        return validator(value)
      } catch (error) {
        errors.push(toError(error).message)
      }
    }

    throw Error(errors.join(", "))
  }
}

export function optional<T>(validator: Validator<T>): Validator<T | undefined> {
  return value => {
    if (value === undefined) {
      return undefined
    }

    return validator(value)
  }
}

export function record<T>(
  validator: Validator<T>,
  options: {
    custom?: (value: Record<string, T>) => void
  } = {}
): Validator<Record<string, T>> {
  return value => {
    if (!isObject(value)) {
      throw Error("Not a record")
    }

    for (const key in value) {
      try {
        validator(value[key])
      } catch (error) {
        throw Error(`Invalid key '${key}' - ${toError(error).message}`)
      }
    }

    if (options.custom) {
      options.custom(value as Record<string, T>)
    }

    return value as Record<string, T>
  }
}

export function string(
  options: {
    custom?: (value: string) => void
    length?: number
    maxLength?: number
    minLength?: number
    regex?: RegExp
  } = {}
): Validator<string> {
  return value => {
    if (!isString(value)) {
      throw Error("Not a string")
    }

    if (options.length !== undefined && options.length !== value.length) {
      throw Error(`String must contain exactly ${options.length} characters`)
    }

    if (options.maxLength !== undefined && options.maxLength > value.length) {
      throw Error(`String contains more than ${options.maxLength} characters`)
    }

    if (options.minLength !== undefined && options.minLength > value.length) {
      throw Error(`String contains less than ${options.minLength} characters`)
    }

    if (options.regex !== undefined && !value.match(options.regex)) {
      throw Error(`String does not match ${options.regex}`)
    }

    if (options.custom) {
      options.custom(value)
    }

    return value
  }
}
