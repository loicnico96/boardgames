import styled from "@emotion/styled"

import { useCacaoActions, useCacaoState, useCacaoStore } from "./store"
import { BasicTile } from "./Tile/BasicTile"
import { ForestTile } from "./Tile/ForestTile"

const ForestDisplayContainer = styled.div`
  display: flex;
  gap: 20px;
`

export function ForestDisplay() {
  const deckSize = useCacaoState(state => state.deck.length)
  const forestTiles = useCacaoState(state => state.tiles)
  const forest = useCacaoStore(store => store.forest)
  const forests = useCacaoStore(store => store.forests)
  const village = useCacaoStore(store => store.village)

  const { selectForestTile } = useCacaoActions()

  return (
    <ForestDisplayContainer>
      <BasicTile>{deckSize}</BasicTile>
      {forestTiles.map((type, index) =>
        type && !forests.some(f => f.index === index) ? (
          <ForestTile
            disabled={!village.confirmed}
            key={index}
            onClick={() => selectForestTile(index)}
            selected={index === forest.index}
            type={type}
          />
        ) : (
          <BasicTile key={index} />
        )
      )}
    </ForestDisplayContainer>
  )
}
