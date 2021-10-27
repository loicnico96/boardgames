import {
  PlayerCardContainer,
  PlayerCardRow,
} from "components/games/common/PlayerCard"

import { usePapayooState } from "../store"

export type PlayerCardProps = {
  playerId: string
}

export function PlayerCard({ playerId }: PlayerCardProps) {
  const { players } = usePapayooState(state => state)

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
