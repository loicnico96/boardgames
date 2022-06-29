import { unique } from "./arrays"
import { assert, toError } from "./errors"
import { Key, ObjectUnion, reduce } from "./objects"
import { isArray, isBoolean, isNumber, isRecord, isString } from "./types"

/**
 * Validator function
 * @param value - Any value
 * @returns The validated value
 * @throws Error if validation fails
 */
export type Validator<T, S = unknown> = (value: S) => T

/**
 * Merges two validators into one
 * @param validatorA - First validator
 * @param validatorB - Second validator
 * @returns A merged validator
 */
export function and<T extends S, S>(
  validatorA: Validator<S>,
  validatorB: Validator<T, S>
): Validator<T> {
  return value => validatorB(validatorA(value))
}

/**
 * Gets a validator that accepts any value
 * @returns A validator that accepts any value
 */
export function any(): Validator<unknown> {
  return value => value
}

/**
 * Gets a validator that accepts an array
 * @param validator - Validator (invoked for each item)
 * @param options - Additional validation rules
 * @returns A validator that accepts an array
 */
export function array<T>(
  validator: Validator<T>,
  options: {
    length?: number
    maxLength?: number
    minLength?: number
    unique?: boolean
  } = {}
): Validator<T[]> {
  return value => {
    assert(isArray(value), "Not an array")
    assert(
      options.length === undefined || value.length === options.length,
      `Array must contain exactly ${options.length} items`
    )
    assert(
      options.maxLength === undefined || value.length <= options.maxLength,
      `Array contains more than ${options.maxLength} items`
    )
    assert(
      options.minLength === undefined || value.length >= options.minLength,
      `Array contains less than ${options.minLength} items`
    )
    assert(
      options.unique !== true || value.length === unique(value).length,
      "Array contains duplicate items"
    )
    return value.map((item, index) => {
      try {
        return validator(item)
      } catch (error) {
        throw Error(`Invalid index ${index} - ${toError(error).message}`)
      }
    })
  }
}

/**
 * Gets a validator that accepts a boolean
 * @returns A validator that accepts a boolean
 */
export function boolean(): Validator<boolean> {
  return value => {
    assert(isBoolean(value), "Not a boolean")
    return value
  }
}

/**
 * Gets a validator that accepts an enum member
 * @remarks Only string enums are accepted.
 * @param enumObject - Enum object
 * @returns A validator that accepts an enum member
 */
export function enumValue<T extends string>(
  enumObject: Record<string, T>
): Validator<T> {
  return oneOf(Object.values(enumObject))
}

/**
 * Gets a validator that accepts a constant value
 * @param constant - A constant value
 * @returns A validator that accepts a constant value (using strict equality)
 */
export function exact<T extends string | number | boolean | null | undefined>(
  constant: T
): Validator<T> {
  return value => {
    assert(value === constant, `Must be ${constant}`)
    return value as T
  }
}

/**
 * Gets a validator that accepts a number
 * @param options - Additional validation rules
 * @returns A validator that accepts a number
 */
export function float(
  options: {
    max?: number
    min?: number
  } = {}
): Validator<number> {
  return value => {
    assert(isNumber(value), "Not a number")
    assert(
      options.max === undefined || value <= options.max,
      `Value is greater than ${options.max}`
    )
    assert(
      options.min === undefined || value >= options.min,
      `Value is less than ${options.min}`
    )
    return value
  }
}

/**
 * Gets a validator that accepts an integer
 * @param options - Additional validation rules
 * @returns A validator that accepts an integer
 */
export function integer(
  options: {
    max?: number
    min?: number
  } = {}
): Validator<number> {
  return value => {
    assert(isNumber(value), "Not a number")
    assert(Number.isInteger(value), "Not an integer")
    assert(
      options.max === undefined || value <= options.max,
      `Value is greater than ${options.max}`
    )
    assert(
      options.min === undefined || value >= options.min,
      `Value is less than ${options.min}`
    )
    return value
  }
}

/**
 * Makes a validator nullable
 * @param validator - Validator
 * @returns A new validator that also accepts null
 */
export function nullable<T>(validator: Validator<T>): Validator<T | null> {
  return or(exact(null), validator)
}

/**
 * Makes a validator optional
 * @param validator - Validator
 * @returns A new validator that also accepts undefined
 */
export function optional<T>(validator: Validator<T>): Validator<T | undefined> {
  return or(exact(undefined), validator)
}

/**
 * Gets a validator that accepts an object with known entries
 * @param validators - Validator for each entry
 * @returns A validator that accepts an object with known entries
 */
export function object<T extends Record<string, Validator<unknown>>>(
  validators: T
): Validator<{
  [K in Key<T>]: ReturnType<T[K]>
}> {
  return value => {
    assert(isRecord(value), "Not a record")
    return reduce(
      validators,
      (result, validator, key) => {
        try {
          const validatedValue = validator(value[key]) as any
          if (validatedValue !== undefined) {
            result[key] = validatedValue
          }
          return result
        } catch (error) {
          if (value[key] === undefined) {
            throw Error(`Missing key '${key}'`)
          } else {
            throw Error(`Invalid key '${key}' - ${toError(error).message}`)
          }
        }
      },
      {} as {
        [K in Key<T>]: ReturnType<T[K]>
      }
    )
  }
}

/**
 * Gets a validator that accepts an object union
 * @param discriminator - Name of the discriminator property
 * @param validators - Validator for each discriminator value
 * @returns A validator that accepts an object union
 */
export function objectUnion<
  P extends string,
  T extends Record<string, Record<string, Validator<unknown>>>
>(
  discriminator: P,
  validators: T
): Validator<
  ObjectUnion<P, { [K in Key<T>]: { [L in Key<T[K]>]: ReturnType<T[K][L]> } }>
> {
  return value => {
    assert(isRecord(value), "Not a record")

    const baseObject = object({
      [discriminator]: oneOf(Object.keys(validators)) as Validator<Key<T>>,
    })(value)

    return {
      ...baseObject,
      ...object(validators[baseObject[discriminator]])(value),
    }
  }
}

/**
 * Gets a validator that accepts one of multiple constant values
 * @param constants - Array of constant values
 * @returns A validator that accepts one of multiple constant values (using strict equality)
 */
export function oneOf<T extends string | number | boolean | null | undefined>(
  constants: T[]
): Validator<T> {
  return value => {
    assert(
      constants.includes(value as T),
      `Must be one of ${constants.join(", ")}`
    )
    return value as T
  }
}

/**
 * Merges two validators into one
 * @param validatorA - First validator
 * @param validatorB - Second validator
 * @returns A merged validator
 */
export function or<T, S>(
  validatorA: Validator<S>,
  validatorB: Validator<T>
): Validator<T | S> {
  return value => {
    try {
      return validatorA(value)
    } catch (error) {
      return validatorB(value)
    }
  }
}

/**
 * Gets a validator that accepts a record with arbitrary keys
 * @param validator - Validator (invoked for each value)
 * @returns A validator that accepts a record with arbitrary keys
 */
export function record<T>(
  validator: Validator<T>
): Validator<Partial<Record<string, T>>> {
  return value => {
    assert(isRecord(value), "Not a record")
    return reduce(
      value,
      (result, itemValue, key) => {
        try {
          if (itemValue !== undefined) {
            result[key] = validator(itemValue)
          }
          return result
        } catch (error) {
          throw Error(`Invalid key '${key}' - ${toError(error).message}`)
        }
      },
      {} as Partial<Record<string, T>>
    )
  }
}

/**
 * Gets a validator that accepts a string
 * @param options - Additional validation rules
 * @returns A validator that accepts a string
 */
export function string(
  options: {
    length?: number
    maxLength?: number
    minLength?: number
    pattern?: RegExp
  } = {}
): Validator<string> {
  return value => {
    assert(isString(value), "Not a string")
    assert(
      options.length === undefined || value.length === options.length,
      `String must contain exactly ${options.length} characters`
    )
    assert(
      options.maxLength === undefined || value.length <= options.maxLength,
      `String contains more than ${options.maxLength} characters`
    )
    assert(
      options.minLength === undefined || value.length >= options.minLength,
      `String contains less than ${options.minLength} characters`
    )
    assert(
      options.pattern === undefined || options.pattern.test(value),
      `String does not match ${options.pattern}`
    )
    return value
  }
}
