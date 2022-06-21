/**
 * Restricts a number between minimum and maximum boundaries
 * @param value - Any number
 * @param min - Minimum boundary
 * @param max - Maximum boundary
 * @returns The value if it's within the boundaries, otherwise the boundary
 * @example clamp(3, 2, 4) // 3
 * @example clamp(1, 2, 4) // 2
 * @example clamp(5, 2, 4) // 4
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Calculates the modulo of a by n
 * @param a - Any number
 * @param n - Any non-zero number
 * @returns The modulo of a by n
 * @example mod(5, 4) // 1
 * @example mod(-5, 4) // 3
 * @example mod(5, -4) // 3
 * @example mod(5, 0) // NaN
 */
export function mod(a: number, n: number): number {
  return Math.abs(((a % n) + n) % n)
}

/**
 * Calculates the total sum of an array of numbers
 * @param values - Array of numbers
 * @returns The sum of all values
 * @example sum([1, 2, 3]) // 6
 * @example sum([]) // 0
 */
export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}
