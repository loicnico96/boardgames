import { Pos } from "@boardgames/utils"

import { Cell, CellType, RoborallyState } from "./model"

export function isInBounds(state: RoborallyState, pos: Pos): boolean {
  return (
    pos.x < 0 ||
    pos.y < 0 ||
    pos.x >= state.board.dimensions.x ||
    pos.y >= state.board.dimensions.y
  )
}

export function getCell(state: RoborallyState, pos: Pos): Cell {
  if (isInBounds(state, pos)) {
    return state.board.cells[pos.x]?.[pos.y] ?? { type: CellType.NORMAL }
  }

  return { type: CellType.HOLE }
}
