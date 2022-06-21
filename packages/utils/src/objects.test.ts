import { filter, mapValues, reduce, size } from "./objects"

describe("reduce", () => {
  it("executes the reducer for each key-value and returns the result", () => {
    const result = reduce(
      {
        a: 3,
        b: 4,
        c: 5,
      },
      (r, v, k) => [...r, `${k}:${v}`],
      ["z:0"]
    )

    expect(result).toStrictEqual(["z:0", "a:3", "b:4", "c:5"])
  })
})

describe("filter", () => {
  it("returns a record with filtered keys", () => {
    const result = filter(
      {
        a: 3,
        b: 4,
        c: 5,
      },
      (v, k) => v + k.charCodeAt(0) > 100
    )

    expect(result).toStrictEqual({
      b: 4,
      c: 5,
    })
  })
})

describe("mapValues", () => {
  it("returns a record with same keys and mapped values", () => {
    const result = mapValues(
      {
        a: 3,
        b: 4,
        c: 5,
      },
      (v, k) => `${k}:${v}`
    )

    expect(result).toStrictEqual({
      a: "a:3",
      b: "b:4",
      c: "c:5",
    })
  })
})

describe("size", () => {
  it("returns the number of keys of a record", () => {
    const result = size({
      a: 3,
      b: 4,
      c: 5,
    })

    expect(result).toBe(3)
  })
})
