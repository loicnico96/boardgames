import {
  count,
  fill,
  generate,
  remove,
  sortBy,
  sortByAlpha,
  SortDirection,
  unique,
} from "./arrays"

describe("count", () => {
  it("counts the number of items in an array", () => {
    const array = [1, 1, 2, 2, 3, 4]
    expect(count(array, 2)).toBe(2)
    expect(count(array, 4)).toBe(1)
    expect(count(array, 5)).toBe(0)
  })
})

describe("fill", () => {
  it("fills an array", () => {
    const array = fill(4, "abc")
    expect(array).toStrictEqual(["abc", "abc", "abc", "abc"])
  })

  it("fills an array based on index", () => {
    const array = fill(4, i => i * i)
    expect(array).toStrictEqual([0, 1, 4, 9])
  })
})

describe("generate", () => {
  it("generates a record from an array of keys", () => {
    const record = generate(["a", "b", "c"], k => [`k${k}`, { k }])
    expect(record).toStrictEqual({
      ka: {
        k: "a",
      },
      kb: {
        k: "b",
      },
      kc: {
        k: "c",
      },
    })
  })
})

describe("remove", () => {
  it("removes items from an array", () => {
    const array = [1, 1, 2, 2, 3, 4]
    expect(remove(array, 2)).toStrictEqual([1, 1, 3, 4])
    expect(remove(array, 4)).toStrictEqual([1, 1, 2, 2, 3])
    expect(remove(array, 5)).toStrictEqual([1, 1, 2, 2, 3, 4])
  })
})

describe("sortBy", () => {
  it("sorts an array", () => {
    const array = ["snake", "cat", "spider", "dog", "horse"]
    const sorted = sortBy(array, s => s.length)
    expect(sorted).toStrictEqual(["cat", "dog", "snake", "horse", "spider"])
  })

  it("sorts an array with multiple conditions", () => {
    const array = ["snake", "cat", "spider", "dog", "horse"]
    const sorted = sortBy(
      array,
      s => s.length,
      s => s.indexOf("a")
    )
    expect(sorted).toStrictEqual(["dog", "cat", "horse", "snake", "spider"])
  })
})

describe("sortByAlpha", () => {
  it("sorts an array alphabetically", () => {
    const array = ["snake", "cat", "spider", "dog", "horse"]
    const sorted = sortByAlpha(array)
    expect(sorted).toStrictEqual(["cat", "dog", "horse", "snake", "spider"])
  })

  it("sorts an array alphabetically in descending order", () => {
    const array = ["snake", "cat", "spider", "dog", "horse"]
    const sorted = sortByAlpha(array, SortDirection.DESCENDING)
    expect(sorted).toStrictEqual(["spider", "snake", "horse", "dog", "cat"])
  })

  it("sorts an array alphabetically with a map function", () => {
    const array = ["snake", "cat", "spider", "dog", "horse"]
    const sorted = sortByAlpha(array, s => s.slice(1))
    expect(sorted).toStrictEqual(["cat", "snake", "dog", "horse", "spider"])
  })
})

describe("unique", () => {
  it("removes duplicate items from an array", () => {
    const array = [1, 1, 2, 2, 3, 4]
    expect(unique(array)).toStrictEqual([1, 2, 3, 4])
  })
})
