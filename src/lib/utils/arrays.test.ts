import { generate } from "./arrays"

describe("generate", () => {
  it("generates an object", () => {
    const keys = ["a", "b", "5", 6]

    const result = generate(keys, key => [key, `${key}-${typeof key}`])

    const expected = {
      a: "a-string",
      b: "b-string",
      5: "5-string",
      6: "6-number",
    }

    expect(result).toStrictEqual(expected)
  })
})
