import seedrandom from "seedrandom"

import { isFunction } from "./types"

export type Random = () => number

/**
 * Creates a new generator, initialized with the provided seed.
 * @param seed - String or number seed for the generator
 * @returns a new generator
 */
export function createGenerator(seed: string | number): Random {
  return seedrandom(String(seed))
}

/**
 * Selects a random integer in a range.
 * @param min - Minimum value (included, defaults to 0)
 * @param max - Maximum value (excluded)
 * @param generator - Random generator to use (defaults to Math.random)
 * @returns a random integer in the range [min, max)
 */
export function randomInt(max: number, generator?: Random): number
export function randomInt(min: number, max: number, generator?: Random): number
export function randomInt(
  minOrMax: number,
  maxOrGenerator: number | Random = Math.random,
  generator: Random = Math.random
) {
  if (isFunction(maxOrGenerator)) {
    return Math.floor(maxOrGenerator() * minOrMax)
  }

  return Math.floor(generator() * (maxOrGenerator - minOrMax)) + minOrMax
}

/**
 * Selects a random element from an array.
 * @param array - Array of values to choose from
 * @param generator - Random generator to use (defaults to Math.random)
 * @returns a random element from the array, or undefined if the array is empty
 */
export function randomValue<T>(
  array: ReadonlyArray<T>,
  generator: Random = Math.random
): T {
  return array[randomInt(array.length, generator)]
}

/**
 * Shuffles the elements of an array (mutable).
 * @param array - Array of values to shuffle
 * @param generator - Random generator to use (defaults to Math.random)
 * @note This mutates the original array.
 */
export function mutableShuffle<T>(
  array: Array<T>,
  generator: Random = Math.random
): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, generator)
    const x = array[i]
    array[i] = array[j]
    array[j] = x
  }
}

/**
 * Shuffles the elements of an array (immutable).
 * @param array - Array of values to shuffle
 * @param generator - Random generator to use (defaults to Math.random)
 * @returns a shuffled clone of the array
 */
export function shuffle<T>(
  array: ReadonlyArray<T>,
  generator: Random = Math.random
): Array<T> {
  const clone = array.slice()
  mutableShuffle(clone, generator)
  return clone
}
