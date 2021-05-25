import { filter, keys, mapValues, merge } from "./objects"

// Freeze object to test immutability
const obj = Object.freeze({
  a: "value",
  b: 5,
  c: true,
  d: undefined,
  0: "index",
  5: null,
  6: {
    e: 4,
  },
})

describe("keys", () => {
  it("returns the object's keys", () => {
    expect(keys(obj)).toStrictEqual([0, 5, 6, "a", "b", "c", "d"])
  })
})

describe("filter", () => {
  it("filters the object by values", () => {
    const result = filter(obj, value => typeof value === "string")

    const expected = {
      a: "value",
      0: "index",
    }

    expect(result).toStrictEqual(expected)
  })

  it("filters the object by keys and values", () => {
    const result = filter(obj, (value, key) => typeof value === typeof key)

    const expected = {
      a: "value",
    }

    expect(result).toStrictEqual(expected)
  })
})

describe("mapValues", () => {
  it("maps the object's values", () => {
    const result = mapValues(obj, (value, key) => `${key}-${typeof value}`)

    const expected = {
      a: "a-string",
      b: "b-number",
      c: "c-boolean",
      d: "d-undefined",
      0: "0-string",
      5: "5-object",
      6: "6-object",
    }

    expect(result).toStrictEqual(expected)
  })
})

describe("merge", () => {
  it("merges the object's properties, ignoring undefined", () => {
    // Freeze object to test immutability
    const src = Object.freeze({
      0: false,
      b: undefined,
      c: "other",
      e: undefined,
      f: 13,
    })

    const expected = {
      a: "value",
      b: 5,
      c: "other",
      d: undefined,
      f: 13,
      0: false,
      5: null,
      6: {
        e: 4,
      },
    }

    expect(merge(obj, src)).toStrictEqual(expected)
  })
})
