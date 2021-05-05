import { Enum, EnumKey, EnumValue, enumValues, isEnum } from "./enums"
import { Key, keys, ObjectRecord } from "./objects"
import { isArray, isBoolean, isNumber, isObject, isString } from "./types"

export type Validator<T> = (data: unknown) => T

export type FieldValidators<T extends ObjectRecord> = {
  [K in Key<T>]: Validator<T[K]>
}

export function nullable<T>(validator: Validator<T>): Validator<T | null> {
  return data => {
    if (data === null) {
      return null
    } else {
      return validator(data)
    }
  }
}

export function optional<T>(validator: Validator<T>): Validator<T | undefined> {
  return data => {
    if (data === undefined) {
      return undefined
    } else {
      return validator(data)
    }
  }
}

export function validateArray<T>(
  validator: Validator<T>,
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
        return validator(value)
      } catch (error) {
        throw Error(`Invalid index ${index} - ${error.message}`)
      }
    })
  }
}

export function validateBoolean(): Validator<boolean> {
  return data => {
    if (!isBoolean(data)) {
      throw Error("Not a boolean")
    }

    return data
  }
}

export function validateEnum<E extends EnumValue, K extends EnumKey>(
  enumObj: Enum<E, K>
): Validator<E> {
  return data => {
    if (!isEnum(data, enumObj)) {
      const values = enumValues(enumObj).map(value => JSON.stringify(value))
      throw Error(`Not one of [ ${values.join(", ")} ]`)
    }

    return data
  }
}

export function validateNumber(
  options: {
    int?: boolean
    min?: number
    max?: number
  } = {}
): Validator<number> {
  return data => {
    if (!isNumber(data)) {
      throw Error("Not a number")
    }

    if (options.int && !Number.isInteger(data)) {
      throw Error("Not an integer")
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

export function validateObject<T extends ObjectRecord>(
  validators: FieldValidators<T>
): Validator<T> {
  return data => {
    if (!isObject(data)) {
      throw Error("Not an object")
    }

    return keys(validators).reduce((result, key) => {
      try {
        result[key] = validators[key](data[key])
        return result
      } catch (error) {
        if (data[key] === undefined) {
          throw Error(`Missing field '${key}'`)
        } else {
          throw Error(`Invalid field '${key}' - ${error.message}`)
        }
      }
    }, {} as T)
  }
}

export function validateRecordt<T>(
  validator: Validator<T>
): Validator<ObjectRecord<T>> {
  return data => {
    if (!isObject(data)) {
      throw Error("Not an object")
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

export function validateString(
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
