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

export function getDir(rot: number): Direction {
  return mod(rot, Directions.length)
}

export type Pos = {
  x: number
  y: number
}

export function movePos(pos: Pos, rot: number, dis: number = 1): Pos {
  switch (getDir(rot)) {
    case Direction.NORTH:
      return { x: pos.x, y: pos.y - dis }
    case Direction.EAST:
      return { x: pos.x + dis, y: pos.y }
    case Direction.SOUTH:
      return { x: pos.x, y: pos.y + dis }
    case Direction.WEST:
      return { x: pos.x - dis, y: pos.y }
  }
}

export function samePos(pos1: Pos, pos2: Pos): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

export function getAdjacentPositions(pos: Pos): Pos[] {
  return Directions.map(direction => movePos(pos, direction))
}

export function isAdjacent(pos1: Pos, pos2: Pos): boolean {
  return getAdjacentPositions(pos1).some(pos => samePos(pos, pos2))
}
