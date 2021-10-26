import {
  PlayerCardContainer,
  PlayerCardRow,
} from "components/games/common/PlayerCard"

import { usePapayooStore } from "./store"

export type PlayerCardProps = {
  playerId: string
}

export function PlayerCard({ playerId }: PlayerCardProps) {
  const { players } = usePapayooStore(store => store.state)

  const player = players[playerId]

  return (
    <PlayerCardContainer>
      <PlayerCardRow>
        {player.name} ({player.score})
      </PlayerCardRow>
      <PlayerCardRow>{player.ready ? "Ready" : "Waiting..."}</PlayerCardRow>
    </PlayerCardContainer>
  )
}
