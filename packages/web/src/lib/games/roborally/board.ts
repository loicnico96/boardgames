import { Direction, getDir, movePos, Position } from "@boardgames/utils"

import { Cell, CellType, RoborallyState, WallType } from "./model"

export function isInBounds(state: RoborallyState, pos: Position): boolean {
  return (
    pos.x >= 0 &&
    pos.y >= 0 &&
    pos.x < state.board.dimensions.x &&
    pos.y < state.board.dimensions.y
  )
}

export function getCell(state: RoborallyState, pos: Position): Cell {
  if (isInBounds(state, pos)) {
    return state.board.cells[pos.x]?.[pos.y] ?? { type: CellType.NORMAL }
  }

  return { type: CellType.HOLE }
}

export function getWall(
  state: RoborallyState,
  pos: Position,
  dir: Direction
): WallType {
  return getCell(state, pos).walls?.[dir] ?? WallType.NONE
}

export function getActivePusher(
  cell: Cell,
  sequence: number
): Direction | null {
  return cell.push?.includes(sequence) ? cell.pushDir ?? null : null
}

export function isActiveCrusher(cell: Cell, sequence: number): boolean {
  return cell.crush?.includes(sequence) ?? false
}

export function isHole(cell: Cell, sequence: number): boolean {
  return cell.type === CellType.HOLE && (cell.seq?.includes(sequence) ?? true)
}

export function isPassable(
  state: RoborallyState,
  pos: Position,
  dir: Direction
): boolean {
  return (
    getWall(state, pos, dir) === WallType.NONE &&
    getWall(state, movePos(pos, dir), getDir(dir + 2)) === WallType.NONE
  )
}
