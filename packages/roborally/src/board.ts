import { Direction, getDir, movePos, Position } from "@boardgames/utils"

import { Cell, RoborallyState } from "./model"

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
    return state.board.cells[pos.x]?.[pos.y] ?? {}
  }

  return { hole: true }
}

export function isWall(
  state: RoborallyState,
  pos: Position,
  dir: Direction
): boolean {
  return getCell(state, pos).walls?.includes(dir) ?? false
}

export function isPassable(
  state: RoborallyState,
  pos: Position,
  dir: Direction
): boolean {
  return (
    !isWall(state, pos, dir) &&
    !isWall(state, movePos(pos, dir), getDir(dir + 2))
  )
}
