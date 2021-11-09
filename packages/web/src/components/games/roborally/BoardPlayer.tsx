import styled from "@emotion/styled"

import { CELL_SIZE } from "./BoardCell"
import { useRoborallyPlayer, useRoborallyState } from "./store"

export const PLAYER_SIZE = 40
export const PLAYER_VIRTUAL_OPACITY = 0.6
export const TRANSITION_DURATION = 600

export type BoardPlayerProps = {
  playerId: string
}

type StyledPlayerProps = {
  color: string
  destroyed: boolean
  rot: number
  virtual: boolean
  x: number
  y: number
}

const StyledPlayer = styled.div<StyledPlayerProps>`
  align-items: center;
  background-color: ${props => props.color};
  border: 1px solid black;
  cursor: ${props => (props.title ? "help" : "default")};
  display: ${props => (props.destroyed ? "hidden" : "flex")};
  height: ${PLAYER_SIZE}px;
  justify-content: center;
  opacity: ${props => (props.virtual ? PLAYER_VIRTUAL_OPACITY : 1)};
  position: absolute;
  text-align: center;
  transform: translate(
      ${props => props.x * CELL_SIZE + (CELL_SIZE - PLAYER_SIZE) / 2}px,
      ${props => props.y * CELL_SIZE + (CELL_SIZE - PLAYER_SIZE) / 2}px
    )
    rotate(${props => props.rot * 90}deg);
  transition-duration: ${TRANSITION_DURATION}ms;
  width: ${PLAYER_SIZE}px;
`

export function BoardPlayer({ playerId }: BoardPlayerProps) {
  const x = useRoborallyPlayer(playerId, player => player.pos.x)
  const y = useRoborallyPlayer(playerId, player => player.pos.y)
  const rot = useRoborallyPlayer(playerId, player => player.rot)
  const name = useRoborallyPlayer(playerId, player => player.name)
  const destroyed = useRoborallyPlayer(playerId, player => player.destroyed)
  const virtual = useRoborallyPlayer(playerId, player => player.virtual)
  const index = useRoborallyState(state => state.playerOrder.indexOf(playerId))

  const color = [
    "red",
    "blueviolet",
    "darkorange",
    "limegreen",
    "brown",
    "dodgerblue",
    "magenta",
    "yellowgreen",
  ][index]

  return (
    <StyledPlayer
      color={color}
      x={x}
      y={y}
      rot={rot}
      title={name}
      virtual={virtual}
      destroyed={destroyed}
    >
      {name}
    </StyledPlayer>
  )
}
