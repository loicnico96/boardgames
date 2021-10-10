import {
  PlayerCardContainer,
  PlayerCardRow,
} from "components/games/common/PlayerCard"
import { useGameState } from "hooks/useGameState"
import { GameType } from "lib/games/types"
import { identity } from "lib/utils/types"

export type PlayerCardProps = {
  playerId: string
}

export function PlayerCard({ playerId }: PlayerCardProps) {
  const { players } = useGameState(GameType.PAPAYOO, identity)

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
