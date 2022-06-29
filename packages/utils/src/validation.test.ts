import { assert } from "./errors"
import {
  and,
  any,
  array,
  boolean,
  enumValue,
  exact,
  float,
  integer,
  nullable,
  object,
  objectUnion,
  oneOf,
  optional,
  or,
  record,
  string,
} from "./validation"

enum TestEnum {
  FOO = "foo",
  BAR = "bar",
}

describe("and", () => {
  it("verifies both conditions", () => {
    const validator = and(string(), value => {
      assert(value.startsWith("foo"), "Must start with foo")
      return value
    })

    expect(validator("foobar")).toBe("foobar")
    expect(() => validator("barbaz")).toThrow("Must start with foo")
  })
})

describe("any", () => {
  it("accepts anything", () => {
    const validator = any()
    expect(validator("foo")).toBe("foo")
    expect(validator(3.14)).toBe(3.14)
    expect(validator(null)).toBe(null)
    expect(validator(undefined)).toBe(undefined)
    expect(validator({})).toStrictEqual({})
    expect(validator([])).toStrictEqual([])
  })
})

describe("array", () => {
  it("accepts an array", () => {
    const validator = array(string())
    expect(validator([])).toStrictEqual([])
    expect(validator(["foo", "bar"])).toStrictEqual(["foo", "bar"])
    expect(() => validator(["foo", 3.14])).toThrow(
      "Invalid index 1 - Not a string"
    )
  })

  it("asserts length", () => {
    const validator = array(string(), { length: 1 })
    expect(() => validator([])).toThrow("Array must contain exactly 1 items")
    expect(validator(["foo"])).toStrictEqual(["foo"])
    expect(() => validator(["foo", "bar"])).toThrow(
      "Array must contain exactly 1 items"
    )
  })

  it("asserts minimum length", () => {
    const validator = array(string(), { minLength: 1 })
    expect(() => validator([])).toThrow("Array contains less than 1 items")
    expect(validator(["foo"])).toStrictEqual(["foo"])
    expect(validator(["foo", "bar"])).toStrictEqual(["foo", "bar"])
  })

  it("asserts maximum length", () => {
    const validator = array(string(), { maxLength: 1 })
    expect(validator([])).toStrictEqual([])
    expect(validator(["foo"])).toStrictEqual(["foo"])
    expect(() => validator(["foo", "bar"])).toThrow(
      "Array contains more than 1 items"
    )
  })

  it("asserts uniqueness", () => {
    const validator = array(string(), { unique: true })
    expect(validator([])).toStrictEqual([])
    expect(validator(["foo", "bar"])).toStrictEqual(["foo", "bar"])
    expect(() => validator(["foo", "foo"])).toThrow(
      "Array contains duplicate items"
    )
  })
})

describe("boolean", () => {
  it("accepts a boolean", () => {
    const validator = boolean()
    expect(validator(true)).toBe(true)
    expect(validator(false)).toBe(false)
    expect(() => validator("true")).toThrow("Not a boolean")
    expect(() => validator("false")).toThrow("Not a boolean")
    expect(() => validator(0)).toThrow("Not a boolean")
    expect(() => validator(1)).toThrow("Not a boolean")
    expect(() => validator(null)).toThrow("Not a boolean")
    expect(() => validator(undefined)).toThrow("Not a boolean")
  })
})

describe("enumValue", () => {
  it("accepts enum member", () => {
    const validator = enumValue(TestEnum)
    expect(validator(TestEnum.FOO)).toBe(TestEnum.FOO)
    expect(validator(TestEnum.BAR)).toBe(TestEnum.BAR)
    expect(() => validator("baz")).toThrow("Must be one of foo, bar")
  })
})

describe("exact", () => {
  it("accepts exact value", () => {
    const validator = exact("foo")
    expect(validator("foo")).toBe("foo")
    expect(() => validator("bar")).toThrow("Must be foo")
  })
})

describe("float", () => {
  it("accepts a number", () => {
    const validator = float()
    expect(validator(3.14)).toBe(3.14)
    expect(validator(-45)).toBe(-45)
    expect(() => validator("3.14")).toThrow("Not a number")
    expect(() => validator(NaN)).toThrow("Not a number")
    expect(() => validator(+Infinity)).toThrow("Not a number")
    expect(() => validator(-Infinity)).toThrow("Not a number")
  })

  it("asserts minimum", () => {
    const validator = float({ min: 1 })
    expect(() => validator(0)).toThrow("Value is less than 1")
    expect(validator(1)).toBe(1)
    expect(validator(2)).toBe(2)
  })

  it("asserts maximum", () => {
    const validator = float({ max: 1 })
    expect(validator(0)).toBe(0)
    expect(validator(1)).toBe(1)
    expect(() => validator(2)).toThrow("Value is greater than 1")
  })
})

describe("integer", () => {
  it("accepts an integer", () => {
    const validator = integer()
    expect(validator(6)).toBe(6)
    expect(validator(-45)).toBe(-45)
    expect(() => validator(3.14)).toThrow("Not an integer")
    expect(() => validator("3")).toThrow("Not a number")
    expect(() => validator(NaN)).toThrow("Not a number")
    expect(() => validator(+Infinity)).toThrow("Not a number")
    expect(() => validator(-Infinity)).toThrow("Not a number")
  })

  it("asserts minimum", () => {
    const validator = integer({ min: 1 })
    expect(() => validator(0)).toThrow("Value is less than 1")
    expect(validator(1)).toBe(1)
    expect(validator(2)).toBe(2)
  })

  it("asserts maximum", () => {
    const validator = integer({ max: 1 })
    expect(validator(0)).toBe(0)
    expect(validator(1)).toBe(1)
    expect(() => validator(2)).toThrow("Value is greater than 1")
  })
})

describe("object", () => {
  it("accepts an object", () => {
    const validator = object({ foo: string(), bar: optional(float()) })
    expect(validator({ foo: "foo" })).toStrictEqual({ foo: "foo" })
    expect(validator({ foo: "foo", bar: 3.14 })).toStrictEqual({
      foo: "foo",
      bar: 3.14,
    })
    expect(validator({ foo: "foo", bar: 3.14, baz: "baz" })).toStrictEqual({
      foo: "foo",
      bar: 3.14,
    })
    expect(() => validator({ foo: "foo", bar: "bar" })).toThrow(
      "Invalid key 'bar' - Not a number"
    )
    expect(() => validator({ bar: 3.14 })).toThrow("Missing key 'foo'")
  })

  it("preserves extra keys", () => {
    const validator = object(
      { foo: string(), bar: optional(float()) },
      { extraKeys: true }
    )
    expect(validator({ foo: "foo", bar: 3.14, baz: "baz" })).toStrictEqual({
      foo: "foo",
      bar: 3.14,
      baz: "baz",
    })
  })
})

describe("objectUnion", () => {
  it("accepts an object union", () => {
    const validator = objectUnion("type", {
      foo: { foo: string() },
      bar: { bar: float() },
    })
    expect(validator({ type: "foo", foo: "foo" })).toStrictEqual({
      type: "foo",
      foo: "foo",
    })
    expect(validator({ type: "bar", bar: 3.14 })).toStrictEqual({
      type: "bar",
      bar: 3.14,
    })
    expect(() => validator({ type: "foo", bar: 3.14 })).toThrow(
      "Missing key 'foo'"
    )
    expect(() => validator({ type: "baz", bar: 3.14 })).toThrow(
      "Invalid key 'type' - Must be one of foo, bar"
    )
    expect(() => validator({ bar: 3.14 })).toThrow("Missing key 'type'")
  })
})

describe("oneOf", () => {
  it("accepts one of values", () => {
    const validator = oneOf(["foo", "bar"])
    expect(validator("foo")).toBe("foo")
    expect(validator("bar")).toBe("bar")
    expect(() => validator("baz")).toThrow("Must be one of foo, bar")
  })
})

describe("or", () => {
  it("accepts either value", () => {
    const validator = or(string(), float())
    expect(validator("foo")).toBe("foo")
    expect(validator(3.14)).toBe(3.14)
    expect(() => validator(null)).toThrow("Not a number")
  })
})

describe("nullable", () => {
  it("accepts null", () => {
    const validator = nullable(string())
    expect(validator("foo")).toBe("foo")
    expect(validator(null)).toBe(null)
    expect(() => validator(undefined)).toThrow("Not a string")
  })
})

describe("optional", () => {
  it("accepts undefined", () => {
    const validator = optional(string())
    expect(validator("foo")).toBe("foo")
    expect(validator(undefined)).toBe(undefined)
    expect(() => validator(null)).toThrow("Not a string")
  })
})

describe("record", () => {
  it("accepts a record", () => {
    const validator = record(string())
    expect(validator({})).toStrictEqual({})
    expect(validator({ foo: "foo", bar: "bar" })).toStrictEqual({
      foo: "foo",
      bar: "bar",
    })
    expect(() => validator({ foo: "foo", bar: 3.14 })).toThrow(
      "Invalid key 'bar' - Not a string"
    )
  })
})

describe("string", () => {
  it("accepts an array", () => {
    const validator = string()
    expect(validator("")).toBe("")
    expect(validator("foo")).toBe("foo")
    expect(() => validator(3.14)).toThrow("Not a string")
  })

  it("asserts length", () => {
    const validator = string({ length: 3 })
    expect(() => validator("")).toThrow(
      "String must contain exactly 3 characters"
    )
    expect(validator("foo")).toBe("foo")
    expect(() => validator("foobar")).toThrow(
      "String must contain exactly 3 characters"
    )
  })

  it("asserts minimum length", () => {
    const validator = string({ minLength: 3 })
    expect(() => validator("")).toThrow(
      "String contains less than 3 characters"
    )
    expect(validator("foo")).toBe("foo")
    expect(validator("foobar")).toBe("foobar")
  })

  it("asserts maximum length", () => {
    const validator = string({ maxLength: 3 })
    expect(validator("")).toBe("")
    expect(validator("foo")).toBe("foo")
    expect(() => validator("foobar")).toThrow(
      "String contains more than 3 characters"
    )
  })

  it("asserts uniqueness", () => {
    const validator = string({ pattern: /foo/ })
    expect(() => validator("")).toThrow("String does not match /foo/")
    expect(validator("foo")).toBe("foo")
    expect(validator("foobar")).toBe("foobar")
  })
})
