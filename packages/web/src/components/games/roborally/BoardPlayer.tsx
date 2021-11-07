import styled from "@emotion/styled"

import { CELL_SIZE } from "./BoardCell"
import { useRoborallyPlayer } from "./store"

export const PLAYER_SIZE = 40
export const TRANSITION_DURATION = 600

export type BoardPlayerProps = {
  playerId: string
}

type StyledPlayerProps = {
  rot: number
  x: number
  y: number
}

const StyledPlayer = styled.div<StyledPlayerProps>`
  align-items: center;
  background-color: red;
  border: 1px solid black;
  cursor: ${props => (props.title ? "help" : "default")};
  display: flex;
  height: ${PLAYER_SIZE}px;
  justify-content: center;
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

  return (
    <StyledPlayer x={x} y={y} rot={rot} title={name}>
      {name}
    </StyledPlayer>
  )
}
