import { clamp, mod, sum } from "./math"

describe("clamp", () => {
  it("returns a number within a range", () => {
    expect(clamp(0, 1, 3)).toBe(1)
    expect(clamp(1, 1, 3)).toBe(1)
    expect(clamp(2, 1, 3)).toBe(2)
    expect(clamp(3, 1, 3)).toBe(3)
    expect(clamp(4, 1, 3)).toBe(3)
  })
})

describe("mod", () => {
  it("returns a modulo", () => {
    expect(mod(3, 4)).toBe(3)
    expect(mod(45, 4)).toBe(1)
    expect(mod(-9, 4)).toBe(3)
    expect(mod(-9, 0)).toBeNaN()
  })
})

describe("sum", () => {
  it("returns the sum of elements in an array", () => {
    expect(sum([3, 15, -6, 27])).toBe(39)
    expect(sum([])).toBe(0)
  })
})
