import { Direction, getDir, movePos, Pos } from "@boardgames/utils"

import { Cell, CellType, RoborallyState, WallType } from "./model"

export function isInBounds(state: RoborallyState, pos: Pos): boolean {
  return (
    pos.x >= 0 &&
    pos.y >= 0 &&
    pos.x < state.board.dimensions.x &&
    pos.y < state.board.dimensions.y
  )
}

export function getCell(state: RoborallyState, pos: Pos): Cell {
  if (isInBounds(state, pos)) {
    return state.board.cells[pos.x]?.[pos.y] ?? { type: CellType.NORMAL }
  }

  return { type: CellType.HOLE }
}

export function getWall(
  state: RoborallyState,
  pos: Pos,
  dir: Direction
): WallType {
  return getCell(state, pos).walls?.[dir] ?? WallType.NONE
}

export function isPassable(
  state: RoborallyState,
  pos: Pos,
  dir: Direction
): boolean {
  return (
    getWall(state, pos, dir) === WallType.NONE &&
    getWall(state, movePos(pos, dir), getDir(dir + 2)) === WallType.NONE
  )
}
