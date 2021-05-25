/* eslint-disable @typescript-eslint/prefer-enum-initializers */
import { enumKeys, enumValues, isEnum } from "./enums"

enum TestEnumString {
  A = "a",
  B = "b",
  C = "c",
}

enum TestEnumNumber {
  A = 50,
  B = 75.56,
  C = -175,
}

enum TestEnumNumberAuto {
  A,
  B,
  C,
}

enum TestEnumMixed {
  A,
  B = "b",
  C = 247,
}

describe("enumKeys", () => {
  it("returns enum keys for string enums", () => {
    expect(enumKeys(TestEnumString)).toStrictEqual(["A", "B", "C"])
  })

  it("returns enum keys for number enums", () => {
    expect(enumKeys(TestEnumNumber)).toStrictEqual(["A", "B", "C"])
  })

  it("returns enum keys for number enums (automatic)", () => {
    expect(enumKeys(TestEnumNumberAuto)).toStrictEqual(["A", "B", "C"])
  })

  it("returns enum keys for mixed enums", () => {
    expect(enumKeys(TestEnumMixed)).toStrictEqual(["A", "B", "C"])
  })
})

describe("enumValues", () => {
  it("returns enum values for string enums", () => {
    expect(enumValues(TestEnumString)).toStrictEqual(["a", "b", "c"])
  })

  it("returns enum values for number enums", () => {
    expect(enumValues(TestEnumNumber)).toStrictEqual([50, 75.56, -175])
  })

  it("returns enum values for number enums (automatic)", () => {
    expect(enumValues(TestEnumNumberAuto)).toStrictEqual([0, 1, 2])
  })

  it("returns enum keys for mixed enums", () => {
    expect(enumValues(TestEnumMixed)).toStrictEqual([0, "b", 247])
  })
})

describe("isEnum", () => {
  const values = ["", "1", "50", "b", 2, 50, -175, 247, null, undefined, false]

  it("checks enum members for string enums", () => {
    const filtered = values.filter(value => isEnum(value, TestEnumString))
    expect(filtered).toStrictEqual(["b"])
  })

  it("checks enum members for number enums", () => {
    const filtered = values.filter(value => isEnum(value, TestEnumNumber))
    expect(filtered).toStrictEqual([50, -175])
  })

  it("checks enum members for number enums (automatic)", () => {
    const filtered = values.filter(value => isEnum(value, TestEnumNumberAuto))
    expect(filtered).toStrictEqual([2])
  })

  it("checks enum members for mixed enums", () => {
    const filtered = values.filter(value => isEnum(value, TestEnumMixed))
    expect(filtered).toStrictEqual(["b", 247])
  })
})
