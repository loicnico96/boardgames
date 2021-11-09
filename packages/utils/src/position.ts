import { mod } from "./math"

export type Position = {
  x: number
  y: number
}

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

export enum Rotation {
  LEFT = -1,
  RIGHT = 1,
}

export function getDir(rot: number): Direction {
  return mod(rot, Directions.length)
}

export function movePos(pos: Position, rot: number, dis: number = 1): Position {
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

export function getAdjacentPos(pos: Position): Position[] {
  return Directions.map(direction => movePos(pos, direction))
}

export function isSamePos(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

export function isAdjacentPos(pos1: Position, pos2: Position): boolean {
  return getAdjacentPos(pos1).some(pos => isSamePos(pos, pos2))
}
