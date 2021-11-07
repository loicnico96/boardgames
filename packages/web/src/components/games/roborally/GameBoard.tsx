import { fill } from "@boardgames/utils"
import styled from "@emotion/styled"

import { BoardCell } from "./BoardCell"
import { BoardPlayer } from "./BoardPlayer"
import { useRoborallyState } from "./store"

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px;
`

const BoardRow = styled.div`
  display: flex;
`

export function GameBoard() {
  const boardHeight = useRoborallyState(state => state.board.dimensions.y)
  const boardWidth = useRoborallyState(state => state.board.dimensions.x)
  const playerIds = useRoborallyState(state => state.playerOrder)

  return (
    <BoardContainer>
      {fill(boardHeight, y => (
        <BoardRow key={y}>
          {fill(boardWidth, x => (
            <BoardCell key={x} x={x} y={y} />
          ))}
        </BoardRow>
      ))}
      {playerIds.map(playerId => (
        <BoardPlayer key={playerId} playerId={playerId} />
      ))}
    </BoardContainer>
  )
}
