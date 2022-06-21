import seedrandom from "seedrandom"

/**
 * Helper class to generate randomness, initialized with a seed or not
 */
export class Random {
  /**
   * Function returning a random number between 0.0 and 1.0
   */
  public readonly generator: () => number
  /**
   * Seed provided in constructor
   */
  public readonly seed?: string | number

  /**
   * Creates a Random instance with the default generator
   */
  public constructor()
  /**
   * Creates a Random instance initialized with the given seed
   * @param seed - Non-empty string or numbe
   */
  public constructor(seed: string | number)
  public constructor(seed?: string | number) {
    this.generator = seed ? seedrandom(String(seed)) : Math.random
    this.seed = seed
  }

  /**
   * Generates a random floating-point number
   * @returns A random number between 0.0 (included) and 1.0 (excluded)
   */
  public float(): number {
    return this.generator()
  }

  /**
   * Generates a random integer
   * @param max - Maximum boundary (excluded)
   * @returns A random number between 0 (included) and max (excluded)
   */
  public int(max: number): number
  /**
   * Generates a random integer
   * @param min - Minimum boundary (included)
   * @param max - Maximum boundary (excluded)
   * @returns A random number between min (included) and max (excluded)
   */
  public int(min: number, max: number): number
  public int(min: number, max: number = 0) {
    return Math.floor(this.float() * (max - min)) + min
  }

  /**
   * Picks a random value from an array
   * @remarks The array should not be empty.
   * @param array - Array to pick from
   * @returns A random array value
   */
  public pick<T>(array: ReadonlyArray<T>): T {
    return array[this.int(array.length)]
  }

  /**
   * Shuffles an array
   * @remarks The array will be mutated.
   * @param array - Array to shuffle
   */
  public shuffle<T>(array: Array<T>): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.int(i + 1)
      const x = array[i]
      array[i] = array[j]
      array[j] = x
    }
  }
}
