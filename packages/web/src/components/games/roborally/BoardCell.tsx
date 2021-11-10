import { Direction, Position, isSamePos } from "@boardgames/utils"
import styled from "@emotion/styled"

import { getCell } from "lib/games/roborally/board"
import { RoborallyState } from "lib/games/roborally/model"

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

export function getCellColor(state: RoborallyState, pos: Position): string {
  const cell = getCell(state, pos)

  if (cell.hole) {
    return cell.water ? "darkblue" : "black"
  }

  return cell.water ? "royalblue" : "lightgray"
}

export function getCellSymbol(
  state: RoborallyState,
  pos: Position
): string | null {
  const cell = getCell(state, pos)

  const checkpoint = state.board.checkpoints.findIndex(checkpointPos =>
    isSamePos(pos, checkpointPos)
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

  if (cell.gear) {
    return cell.gear.rot > 0 ? "\u21BB" : "\u21BA"
  }

  if (cell.conveyor) {
    if (cell.conveyor.fast) {
      return ["\u21C8", "\u21C9", "\u21CA", "\u21C7"][cell.conveyor.dir]
    }

    return ["\u2191", "\u2192", "\u2193", "\u2190"][cell.conveyor.dir]
  }

  if (cell.repair) {
    return "\u2692"
  }

  if (cell.teleport) {
    // TODO
    return "T"
  }

  if (cell.portal) {
    // TODO
    return "P"
  }

  if (cell.crush) {
    // TODO
    return "C"
  }

  return null
}

export function getCellTooltip(state: RoborallyState, pos: Position): string {
  const cell = getCell(state, pos)
  const tooltips: string[] = []

  const checkpoint = state.board.checkpoints.findIndex(checkpointPos =>
    isSamePos(pos, checkpointPos)
  )

  if (checkpoint >= 0) {
    if (checkpoint === 0) {
      tooltips.push("Starting position")
    } else {
      const checkpointCount = state.board.checkpoints.length - 1
      tooltips.push(`Checkpoint ${checkpoint} / ${checkpointCount}`)
    }
  }

  if (cell.portal) {
    tooltips.push(`Portal (${cell.portal.pos.x}-${cell.portal.pos.y})`)
  }

  if (cell.teleport) {
    tooltips.push("Teleporter")
  }

  if (cell.hole) {
    tooltips.push(cell.water ? "Water drain" : "Hole")
  }

  if (cell.trap) {
    const active = cell.trap.active.map(i => i + 1).join("-")
    tooltips.push(`Trap (${active})`)
  }

  if (cell.conveyor) {
    const dir = ["North", "East", "South", "West"][cell.conveyor.dir]
    if (cell.water) {
      tooltips.push(`Water current (${dir})`)
    } else if (cell.conveyor.fast) {
      tooltips.push(`Express conveyor (${dir})`)
    } else {
      tooltips.push(`Conveyor (${dir})`)
    }
  }

  if (cell.push) {
    const dir = ["North", "East", "South", "West"][cell.push.dir]
    const active = cell.push.active.map(i => i + 1).join("-")
    tooltips.push(`Pusher (${dir}, ${active})`)
  }

  if (cell.crush) {
    const active = cell.crush.active.map(i => i + 1).join("-")
    tooltips.push(`Crusher (${active})`)
  }

  if (cell.gear) {
    const rot = cell.gear.rot > 0 ? "clockwise" : "counter-clockwise"
    tooltips.push(`Gear (${rot})`)
  }

  if (cell.repair) {
    tooltips.push("Repair site")
  }

  if (cell.water && cell.hole !== true && !cell.conveyor) {
    tooltips.push("Water")
  }

  return tooltips.join("\n")
}

export function BoardCell({ x, y }: BoardCellProps) {
  const color = useRoborallyState(state => getCellColor(state, { x, y }))
  const symbol = useRoborallyState(state => getCellSymbol(state, { x, y }))
  const tooltip = useRoborallyState(state => getCellTooltip(state, { x, y }))
  const walls = useRoborallyState(state => getCell(state, { x, y }).walls)

  return (
    <StyledCell background={color} title={tooltip}>
      {symbol}
      {walls?.map(dir => (
        <StyledWall key={dir} direction={dir} title="Wall" />
      ))}
    </StyledCell>
  )
}
