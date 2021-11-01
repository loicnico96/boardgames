import { mod } from "./math"

export enum Direction {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}

export const Directions = [
  Direction.NORTH,
  Direction.EAST,
  Direction.SOUTH,
  Direction.WEST,
]

export function dir(rot: number): Direction {
  return mod(rot, Directions.length)
}

export type Pos = {
  x: number
  y: number
}

export function movePos(pos: Pos, rot: number, dis: number): Pos {
  return [
    {
      x: pos.x,
      y: pos.y - dis,
    },
    {
      x: pos.x + dis,
      y: pos.y,
    },
    {
      x: pos.x,
      y: pos.y + dis,
    },
    {
      x: pos.x - dis,
      y: pos.y,
    },
  ][dir(rot)]
}

export function samePos(pos1: Pos, pos2: Pos): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y
}
