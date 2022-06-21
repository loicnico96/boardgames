import { fill } from "./arrays"
import { Random } from "./random"

const ARRAY = fill(10000, i => i)

describe("Random", () => {
  it("returns random numbers between 0 and 1", () => {
    const generator = new Random()
    for (let i = 0; i < 100; i++) {
      const value = generator.float()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })

  it("returns random integers between 0 and max", () => {
    const generator = new Random()
    for (let i = 0; i < 100; i++) {
      const value = generator.int(6)
      expect(Number.isInteger(value)).toBe(true)
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(6)
    }
  })

  it("returns random integers between min and max", () => {
    const generator = new Random()
    for (let i = 0; i < 100; i++) {
      const value = generator.int(6, 12)
      expect(Number.isInteger(value)).toBe(true)
      expect(value).toBeGreaterThanOrEqual(6)
      expect(value).toBeLessThan(12)
    }
  })

  it("returns random elements of an array", () => {
    const generator = new Random()
    const array = ["a", "b", "c", "d", "e"]
    for (let i = 0; i < 100; i++) {
      const value = generator.pick(array)
      expect(array).toContain(value)
    }
  })

  it("produces different results if called several times", () => {
    const generator = new Random()
    const values = new Set<number>()
    for (let i = 0; i < 100; i++) {
      const value = generator.float()
      expect(values).not.toContain(value)
      values.add(value)
    }
  })

  it("produces predictable results with a seed", () => {
    const generator = new Random("seed")
    expect(generator.float()).toBe(0.5661807692527293)
    expect(generator.int(1000000)).toBe(159159)
    expect(generator.pick(ARRAY)).toBe(8502)
    const array = ["a", "b", "c", "d", "e"]
    generator.shuffle(array)
    expect(array).toStrictEqual(["b", "d", "e", "a", "c"])
  })

  it("produces the same results with the same seed", () => {
    const generator1 = new Random("seed")
    const generator2 = new Random("seed")
    expect(generator1.float()).toBe(generator2.float())
    expect(generator1.int(1000000)).toBe(generator2.int(1000000))
    expect(generator1.pick(ARRAY)).toBe(generator2.pick(ARRAY))
  })

  it("produces different results with different seeds", () => {
    const generator1 = new Random("seed")
    const generator2 = new Random("other")
    expect(generator1.float()).not.toBe(generator2.float())
    expect(generator1.int(1000000)).not.toBe(generator2.int(1000000))
    expect(generator1.pick(ARRAY)).not.toBe(generator2.pick(ARRAY))
  })
})
