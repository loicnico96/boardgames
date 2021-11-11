import {
  Direction,
  getAdjacentPos,
  getDir,
  isAdjacentPos,
  isSamePos,
  movePos,
  Rotation,
} from "./position"

describe("getDir", () => {
  it("returns a Direction", () => {
    expect(getDir(3)).toBe(Direction.WEST)
    expect(getDir(56)).toBe(Direction.NORTH)
    expect(getDir(-2)).toBe(Direction.SOUTH)
  })

  it("returns a Direction with a rotation", () => {
    expect(getDir(Direction.NORTH + Rotation.LEFT)).toBe(Direction.WEST)
    expect(getDir(Direction.NORTH + Rotation.RIGHT)).toBe(Direction.EAST)
  })
})

describe("movePos", () => {
  it("moves a Position in a Direction", () => {
    const pos = {
      x: 65,
      y: 34,
    }

    expect(movePos(pos, Direction.NORTH)).toStrictEqual({
      x: 65,
      y: 33,
    })

    expect(movePos(pos, Direction.EAST, 1)).toStrictEqual({
      x: 66,
      y: 34,
    })

    expect(movePos(pos, Direction.SOUTH, 2)).toStrictEqual({
      x: 65,
      y: 36,
    })

    expect(movePos(pos, Direction.WEST, 3)).toStrictEqual({
      x: 62,
      y: 34,
    })
  })
})

describe("getAdjacentPos", () => {
  it("returns the four adjacent Positions", () => {
    const pos = {
      x: 65,
      y: 34,
    }

    expect(getAdjacentPos(pos)).toStrictEqual([
      {
        x: 65,
        y: 33,
      },
      {
        x: 66,
        y: 34,
      },
      {
        x: 65,
        y: 35,
      },
      {
        x: 64,
        y: 34,
      },
    ])
  })
})

describe("isSamePos", () => {
  it("returns whether two Positions are the same", () => {
    const pos = {
      x: 65,
      y: 34,
    }

    expect(isSamePos(pos, { x: 65, y: 34 })).toBe(true)
    expect(isSamePos(pos, { x: 65, y: 35 })).toBe(false)
    expect(isSamePos(pos, { x: 34, y: 65 })).toBe(false)
  })
})

describe("isAdjacentPos", () => {
  it("returns  whether two Positions are adjacent", () => {
    const pos = {
      x: 65,
      y: 34,
    }

    expect(isAdjacentPos(pos, { x: 65, y: 34 })).toBe(false)
    expect(isAdjacentPos(pos, { x: 65, y: 35 })).toBe(true)
    expect(isAdjacentPos(pos, { x: 34, y: 65 })).toBe(false)
  })
})
