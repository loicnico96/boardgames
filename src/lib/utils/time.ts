export type Time = bigint

export function getTime(): Time {
  return process.hrtime.bigint()
}

export function getTimeDiff(start: Time): number {
  return Number((getTime() - start) / BigInt(1000)) / 1000
}

export function wait(timeout: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}
