export function getTime(): bigint {
  return process.hrtime.bigint()
}

export function getTimeDiff(start: bigint): number {
  return Number((getTime() - start) / BigInt(1000)) / 1000
}
