import styled from "@emotion/styled"

import { BoardTile } from "./BoardTile"
import { ForestTile } from "./ForestTile"
import { useCacaoState } from "./store"

const ForestDisplayContainer = styled.div`
  display: flex;
  gap: 20px;
`

export function ForestDisplay() {
  const deckSize = useCacaoState(state => state.deck.length)
  const forestTiles = useCacaoState(state => state.tiles)

  return (
    <ForestDisplayContainer>
      <BoardTile>{deckSize}</BoardTile>
      {forestTiles.map((type, index) =>
        type ? (
          <ForestTile key={index} type={type} />
        ) : (
          <BoardTile key={index} />
        )
      )}
    </ForestDisplayContainer>
  )
}
