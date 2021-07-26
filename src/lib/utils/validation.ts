import { ArrayOfMinSize, ArrayValue } from "./arrays"
import { Enum, EnumKey, EnumValue, enumValues, isEnum } from "./enums"
import { keys, ObjectRecord } from "./objects"
import {
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
} from "./types"

export type Scalar = string | number | boolean | null | undefined

export type Validator<T> = (data: unknown) => T

export type ValidatorValue<T> = T extends Validator<infer U> ? U : T

export function validate<T>(
  value: unknown,
  validator: Validator<T> | Extract<T, Scalar>
): T {
  if (isFunction(validator)) {
    return validator(value)
  }

  if (value === validator) {
    return value as Extract<T, Scalar>
  }

  throw Error(`Not equal to ${JSON.stringify(validator)}`)
}

export function any(): Validator<unknown> {
  return data => data
}

export function nullable<T>(
  validator: Validator<T> | Extract<T, Scalar>
): Validator<T | null> {
  return data => (data === null ? data : validate(data, validator))
}

export function optional<T>(
  validator: Validator<T> | Extract<T, Scalar>
): Validator<T | undefined> {
  return data => (data === undefined ? data : validate(data, validator))
}

export function oneOf<T extends ArrayOfMinSize<Validator<any> | Scalar, 2>>(
  ...validators: T
): Validator<ValidatorValue<ArrayValue<T>>> {
  const errors: string[] = []

  return data => {
    for (const validator of validators) {
      try {
        return validate(data, validator)
      } catch (error) {
        errors.push(error.message)
      }
    }

    throw Error(errors.join(", "))
  }
}

export function array<T>(
  validator: Validator<T> | Extract<T, Scalar>,
  options: {
    minLength?: number
    maxLength?: number
  } = {}
): Validator<T[]> {
  return data => {
    if (!isArray(data)) {
      throw Error("Not an array")
    }

    if (isNumber(options.minLength) && data.length > options.minLength) {
      throw Error(
        `Array has length ${data.length} but minimum size is ${options.minLength}`
      )
    }

    if (isNumber(options.maxLength) && data.length > options.maxLength) {
      throw Error(
        `Array has length ${data.length} but maximum size is ${options.maxLength}`
      )
    }

    return data.map((value, index) => {
      try {
        return validate(value, validator)
      } catch (error) {
        throw Error(`Invalid index ${index} - ${error.message}`)
      }
    })
  }
}

export function boolean(): Validator<boolean> {
  return data => {
    if (!isBoolean(data)) {
      throw Error("Not a boolean")
    }

    return data
  }
}

export function enumValue<E extends EnumValue, K extends EnumKey>(
  enumObj: Enum<E, K>
): Validator<E> {
  return data => {
    if (!isEnum(data, enumObj)) {
      const values = enumValues(enumObj).map(value => JSON.stringify(value))
      throw Error(`Not one of ${values.join(", ")}`)
    }

    return data
  }
}

export function float(
  options: {
    min?: number
    max?: number
  } = {}
): Validator<number> {
  return data => {
    if (!isNumber(data)) {
      throw Error("Not a number")
    }

    if (isNumber(options.min) && data > options.min) {
      throw Error(`Number is less than ${options.min}`)
    }

    if (isNumber(options.max) && data > options.max) {
      throw Error(`Number is greater than ${options.max}`)
    }

    return data
  }
}

export function int(
  options: {
    min?: number
    max?: number
  } = {}
): Validator<number> {
  return data => {
    const asNumber = float(options)(data)

    if (!Number.isInteger(asNumber)) {
      throw Error("Not an integer")
    }

    return asNumber
  }
}

export type ObjectValidators<T extends ObjectRecord> = {
  [K in keyof T]: Validator<T[K]> | Extract<T[K], Scalar>
}

export function object<T extends ObjectRecord>(
  validators: ObjectValidators<T>
): Validator<T> {
  return data => {
    if (!isObject(data)) {
      throw Error("Not an object")
    }

    return keys(validators).reduce((result, key) => {
      try {
        result[key] = validate(data[key], validators[key])
        return result
      } catch (error) {
        throw Error(
          data[key] === undefined
            ? `Missing field '${key}'`
            : `Invalid field '${key}' - ${error.message}`
        )
      }
    }, {} as T)
  }
}

export function record(): Validator<ObjectRecord<unknown>>
export function record<T>(validator: Validator<T>): Validator<ObjectRecord<T>>
export function record<T>(validator?: Validator<T>) {
  return (data: unknown) => {
    if (!isObject(data)) {
      throw Error("Not an object")
    }

    if (!validator) {
      return data
    }

    return keys(data).reduce((result, key) => {
      try {
        result[key] = validator(data[key])
        return result
      } catch (error) {
        throw Error(`Invalid field '${key}' - ${error.message}`)
      }
    }, {} as ObjectRecord<T>)
  }
}

export function string(
  options: {
    minLength?: number
    maxLength?: number
    regex?: RegExp
  } = {}
): Validator<string> {
  return data => {
    if (!isString(data)) {
      throw Error("Not a string")
    }

    if (isNumber(options.minLength) && data.length > options.minLength) {
      throw Error(
        `String has length ${data.length} but minimum size is ${options.minLength}`
      )
    }

    if (isNumber(options.maxLength) && data.length > options.maxLength) {
      throw Error(
        `String has length ${data.length} but maximum size is ${options.maxLength}`
      )
    }

    if (options.regex && !options.regex.test(data)) {
      throw Error(`String does not match ${options.regex.toString()}`)
    }

    return data
  }
}
