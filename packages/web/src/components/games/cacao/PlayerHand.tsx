import styled from "@emotion/styled"

import { BoardTile } from "./BoardTile"
import { useCacaoPlayer } from "./store"
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

  return (
    <ForestDisplayContainer>
      <BoardTile>{deckSize}</BoardTile>
      {villageTiles.map((type, index) => (
        <VillageTile key={index} playerId={playerId} type={type} />
      ))}
    </ForestDisplayContainer>
  )
}
