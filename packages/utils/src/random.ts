import seedrandom from "seedrandom"

export class Random {
  public readonly generator: () => number = Math.random
  public readonly seed: string | number | undefined

  public constructor(seed?: string | number) {
    this.seed = seed
    if (seed !== undefined) {
      this.generator = seedrandom(String(seed))
    }
  }

  public float(): number {
    return this.generator()
  }

  public int(max: number): number
  public int(min: number, max: number): number
  public int(min: number, max: number = 0) {
    return Math.floor(this.float() * (max - min)) + min
  }

  public pick<T>(array: ReadonlyArray<T>): T {
    return array[this.int(array.length)]
  }

  public shuffle<T>(array: Array<T>): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.int(i + 1)
      const x = array[i]
      array[i] = array[j]
      array[j] = x
    }
  }
}
