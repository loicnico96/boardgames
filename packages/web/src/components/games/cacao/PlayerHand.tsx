import styled from "@emotion/styled"

import { useCacaoActions, useCacaoPlayer, useCacaoStore } from "./store"
import { BasicTile } from "./Tile/BasicTile"
import { VillageTile } from "./Tile/VillageTile"

const ForestDisplayContainer = styled.div`
  display: flex;
  gap: 20px;
`

export type PlayerHandProps = {
  playerId: string
}

export function PlayerHand({ playerId }: PlayerHandProps) {
  const deckSize = useCacaoPlayer(playerId, player => player.deck.length)
  const villageTiles = useCacaoPlayer(playerId, player => player.hand)
  const isSelecting = useCacaoPlayer(playerId, player => !player.ready)

  const village = useCacaoStore(store => store.village)

  const { selectVillageTile } = useCacaoActions()

  return (
    <ForestDisplayContainer>
      <BasicTile>{deckSize}</BasicTile>
      {villageTiles.map((type, index) => (
        <VillageTile
          disabled={village.confirmed}
          key={index}
          onClick={isSelecting ? () => selectVillageTile(index) : undefined}
          playerId={playerId}
          rot={index === village.index ? village.rot : undefined}
          selected={index === village.index}
          type={type}
        />
      ))}
    </ForestDisplayContainer>
  )
}
