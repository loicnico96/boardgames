import { fill } from "@boardgames/utils"
import styled from "@emotion/styled"

import { BOARD_SIZE } from "lib/games/cacao/constants"

import { BoardTile } from "./BoardTile"
import { InteractiveTile } from "./InteractiveTile"

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
