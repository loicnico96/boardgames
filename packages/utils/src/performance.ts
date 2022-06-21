/**
 * Precise time measurement (in nanoseconds)
 */
export type Time = bigint

/**
 * Gets the current time
 * @returns The current time (in nanoseconds)
 */
export function getTime(): Time {
  return process.hrtime.bigint()
}

/**
 * Gets the time ellapsed since given start time
 * @param start - Start time (in nanoseconds)
 * @returns The time difference (in seconds)
 */
export function getTimeDiff(start: Time): number {
  return Number((getTime() - start) / BigInt(1000)) / 1000
}

/**
 * @async Waits for the given duration
 * @param duration - Duration (in milliseconds)
 * @returns A promise that resolves after the given duration
 */
export function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
