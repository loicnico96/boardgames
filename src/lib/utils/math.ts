export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function randomInt(max: number): number
export function randomInt(min: number, max: number): number
export function randomInt(min: number, max: number = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}
