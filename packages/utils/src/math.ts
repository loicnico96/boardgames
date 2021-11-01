export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mod(a: number, n: number): number {
  return ((a % n) + n) % n
}

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}
