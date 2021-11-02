import { fill } from "@boardgames/utils"
import styled from "@emotion/styled"

import { BoardTile, InteractiveTile } from "./BoardTile"

const BOARD_SIZE = 18

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const BoardRow = styled.div`
  display: flex;
`

export type GameBoardProps = {
  playerId: string | null
}

export function GameBoard({ playerId }: GameBoardProps) {
  return (
    <BoardContainer>
      {fill(BOARD_SIZE, y => (
        <BoardRow key={y}>
          {fill(BOARD_SIZE, x =>
            playerId !== null ? (
              <InteractiveTile key={x} playerId={playerId} x={x} y={y} />
            ) : (
              <BoardTile key={x} x={x} y={y} />
            )
          )}
        </BoardRow>
      ))}
    </BoardContainer>
  )
}
