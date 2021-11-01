import styled from "@emotion/styled"

import { BoardTile } from "./BoardTile"
import { useCacaoActions, useCacaoPlayer, useCacaoStore } from "./store"
import { VillageTile } from "./VillageTile"

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
  const isReady = useCacaoPlayer(playerId, player => player.ready)

  const selectedIndex = useCacaoStore(store => store.village.index)
  const selectedRot = useCacaoStore(store => store.village.rot)

  const { selectVillageTile } = useCacaoActions()

  return (
    <ForestDisplayContainer>
      <BoardTile>{deckSize}</BoardTile>
      {villageTiles.map((type, index) => (
        <VillageTile
          disabled={isReady}
          key={index}
          onClick={() => selectVillageTile(index)}
          playerId={playerId}
          rot={index === selectedIndex ? selectedRot : 0}
          selected={index === selectedIndex}
          type={type}
        />
      ))}
    </ForestDisplayContainer>
  )
}
