import { Direction, Directions, Pos, samePos } from "@boardgames/utils"
import styled from "@emotion/styled"

import { getCell } from "lib/games/roborally/board"
import { CellType, RoborallyState, WallType } from "lib/games/roborally/model"

import { useRoborallyState } from "./store"

export const CELL_SIZE = 60
export const WALL_SIZE = 6

export type BoardCellProps = {
  x: number
  y: number
}

type StyledCellProps = {
  background: string
}

const StyledCell = styled.div<StyledCellProps>`
  align-items: center;
  background-color: ${props => props.background};
  border: 1px solid black;
  cursor: ${props => (props.title ? "help" : "default")};
  display: flex;
  font-size: 30px;
  height: ${CELL_SIZE}px;
  justify-content: center;
  position: relative;
  text-align: center;
  width: ${CELL_SIZE}px;
`

type StyledWallProps = {
  direction: Direction
  type: WallType
}

const StyledWall = styled.div<StyledWallProps>`
  background-color: yellow;
  border: 1px solid black;
  height: ${props =>
    [WALL_SIZE, CELL_SIZE, WALL_SIZE, CELL_SIZE][props.direction]}px;
  position: absolute;
  ${props => ["top", "top", "bottom", "top"][props.direction]}: -1px;
  ${props => ["left", "right", "left", "left"][props.direction]}: -1px;
  width: ${props =>
    [CELL_SIZE, WALL_SIZE, CELL_SIZE, WALL_SIZE][props.direction]}px;
`

export function getCellColor(state: RoborallyState, pos: Pos): string {
  const cell = getCell(state, pos)

  if (cell.type === CellType.HOLE) {
    return cell.water ? "darkblue" : "black"
  }

  return cell.water ? "royalblue" : "lightgray"
}

export function getCellSymbol(state: RoborallyState, pos: Pos): string | null {
  const cell = getCell(state, pos)

  const checkpoint = state.checkpoints.findIndex(checkpointPos =>
    samePos(pos, checkpointPos)
  )

  if (checkpoint >= 0) {
    return [
      "\u24EA",
      "\u2460",
      "\u2461",
      "\u2462",
      "\u2463",
      "\u2464",
      "\u2465",
      "\u2466",
      "\u2467",
      "\u2468",
      "\u2469",
      "\u246A",
      "\u246B",
      "\u246C",
      "\u246D",
      "\u246E",
      "\u246F",
      "\u2470",
      "\u2471",
      "\u2472",
      "\u2473",
    ][checkpoint]
  }

  switch (cell.type) {
    case CellType.GEAR:
      return cell.rot > 0 ? "\u21BB" : "\u21BA"
    case CellType.CONVEYOR:
      return ["\u2191", "\u2192", "\u2193", "\u2190"][cell.dir]
    case CellType.CONVEYOR_FAST:
      return ["\u21C8", "\u21C9", "\u21CA", "\u21C7"][cell.dir]
    case CellType.REPAIR:
      return "\u2692"
    default:
      return null
  }
}

export function getCellTooltip(
  state: RoborallyState,
  pos: Pos
): string | undefined {
  const cell = getCell(state, pos)

  const checkpoint = state.checkpoints.findIndex(checkpointPos =>
    samePos(pos, checkpointPos)
  )

  if (checkpoint >= 0) {
    return checkpoint === 0
      ? "Starting Position"
      : `Checkpoint ${checkpoint} / ${state.checkpoints.length - 1}`
  }

  switch (cell.type) {
    case CellType.HOLE:
      return "Hole"
    case CellType.GEAR:
      return `Gear (${cell.rot > 0 ? "clockwise" : "counter-clockwise"})`
    case CellType.CONVEYOR:
      return `Conveyor (${["North", "East", "South", "West"][cell.dir]})`
    case CellType.CONVEYOR_FAST:
      return `Fast Conveyor (${["North", "East", "South", "West"][cell.dir]})`
    case CellType.REPAIR:
      return "Repair Site"
    default:
      return cell.water ? "Water" : undefined
  }
}

export function BoardCell({ x, y }: BoardCellProps) {
  const color = useRoborallyState(state => getCellColor(state, { x, y }))
  const symbol = useRoborallyState(state => getCellSymbol(state, { x, y }))
  const tooltip = useRoborallyState(state => getCellTooltip(state, { x, y }))
  const walls = useRoborallyState(state => getCell(state, { x, y }).walls)

  return (
    <StyledCell background={color} title={tooltip}>
      {symbol}
      {walls !== undefined &&
        Directions.map(dir => {
          const wall = walls[dir]

          if (wall === undefined) {
            return null
          }

          return (
            <StyledWall key={dir} direction={dir} title="Wall" type={wall} />
          )
        })}
    </StyledCell>
  )
}
