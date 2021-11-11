import {
  identity,
  isArray,
  isBoolean,
  isEnum,
  isError,
  isFunction,
  isNumber,
  isObject,
  isString,
} from "./types"

enum Enum {
  A = "a",
  B = "b",
  C = "c",
}

describe("identity", () => {
  it("returns the given value", () => {
    const value = { x: 5, y: 6 }
    expect(identity(value)).toBe(value)
  })
})

describe("isArray", () => {
  it("checks if the value is an array", () => {
    expect(isArray(["a", "b", "c"])).toBe(true)
  })
})

describe("isBoolean", () => {
  it("checks if the value is a boolean", () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean("true")).toBe(false)
    expect(isBoolean("false")).toBe(false)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
  })
})

describe("isError", () => {
  it("checks if the value is an Error", () => {
    expect(isError(Error("error"))).toBe(true)
    expect(isError({ message: "error" })).toBe(false)
    expect(isError("error")).toBe(false)
  })
})

describe("isNumber", () => {
  it("checks if the value is a finite number", () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(3.14)).toBe(true)
    expect(isNumber(-7.5)).toBe(true)
    expect(isNumber("0")).toBe(false)
    expect(isNumber("3.14")).toBe(false)
    expect(isNumber("-7.5")).toBe(false)
    expect(isNumber(NaN)).toBe(false)
    expect(isNumber(+Infinity)).toBe(false)
    expect(isNumber(-Infinity)).toBe(false)
  })
})

describe("isEnum", () => {
  it("checks if the value is an enum member", () => {
    expect(isEnum("a", Enum)).toBe(true)
    expect(isEnum("b", Enum)).toBe(true)
    expect(isEnum("a", Enum)).toBe(true)
    expect(isEnum("d", Enum)).toBe(false)
    expect(isEnum("A", Enum)).toBe(false)
  })
})

describe("isFunction", () => {
  it("checks if the value is a function", () => {
    expect(isFunction(isFunction)).toBe(true)
  })
})

describe("isObject", () => {
  it("checks if the value is a reccord", () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ x: 5, y: 6 })).toBe(true)
    expect(isObject(new Date())).toBe(false)
    expect(isObject(new Map())).toBe(false)
    expect(isObject(new Set())).toBe(false)
    expect(isObject([1, 2, 3])).toBe(false)
    expect(isObject(null)).toBe(false)
  })
})

describe("isString", () => {
  it("checks if the value is a string", () => {
    expect(isString("abc")).toBe(true)
  })
})
