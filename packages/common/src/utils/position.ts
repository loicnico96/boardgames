import { isNumber, mod } from "@boardgames/utils"

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

export enum Rotation {
  LEFT = -1,
  RIGHT = 1,
}

export const Directions = Object.values(Direction).filter<Direction>(isNumber)

export function getDir(rot: number): Direction {
  return mod(rot, Directions.length)
}

export function movePos(
  pos: Position,
  dir: Direction,
  dis: number = 1
): Position {
  return {
    x: pos.x + dis * (dir % 2) * (2 - dir),
    y: pos.y + dis * (1 - (dir % 2)) * (dir - 1),
  }
}

export function getAdjacentPos(pos: Position): Position[] {
  return Directions.map(dir => movePos(pos, dir))
}

export function isSamePos(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

export function isAdjacentPos(pos1: Position, pos2: Position): boolean {
  return getAdjacentPos(pos1).some(pos => isSamePos(pos, pos2))
}
