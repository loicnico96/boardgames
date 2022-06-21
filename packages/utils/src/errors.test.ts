import { assert, toError } from "./errors"

describe("assert", () => {
  it("throws an error if condition is false", () => {
    const v = 5 as number
    expect((): 3 => {
      assert(v === 3, "Invalid")
      return v // Type inference test
    }).toThrowError("Invalid")
  })

  it("does not throw if condition is true", () => {
    const v = 5 as number
    expect((): 5 => {
      assert(v === 5, "Invalid")
      return v // Type inference test
    }).not.toThrow()
  })
})

describe("toError", () => {
  it("returns an error directly", () => {
    const error = Error("Invalid")
    expect(toError(error)).toBe(error)
  })

  it("returns an error with given message", () => {
    const error = toError("Invalid")
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe("Invalid")
    expect(error.originalError).toBeUndefined()
  })

  it("returns an unknown error", () => {
    const error = toError(3)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe("Unknown error")
    expect(error.originalError).toBe(3)
  })
})
