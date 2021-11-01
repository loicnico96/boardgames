import { fill } from "@boardgames/utils"
import styled from "@emotion/styled"

import { isForestTile, isVillageTile } from "lib/games/cacao/model"

import { BoardTile } from "./BoardTile"
import { ForestTile } from "./ForestTile"
import { useCacaoState } from "./store"
import { VillageTile } from "./VillageTile"

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const BoardRow = styled.div`
  display: flex;
`

export function GameBoard() {
  const board = useCacaoState(state => state.board)

  return (
    <BoardContainer>
      {fill(16, y => (
        <BoardRow key={y}>
          {fill(16, x => {
            const row = board[x] ?? {}
            const tile = row[y]

            if (tile) {
              if (isForestTile(tile)) {
                return <ForestTile key={x} {...tile} />
              }

              if (isVillageTile(tile)) {
                return <VillageTile key={x} {...tile} />
              }
            }

            return <BoardTile key={x} />
          })}
        </BoardRow>
      ))}
    </BoardContainer>
  )
}
