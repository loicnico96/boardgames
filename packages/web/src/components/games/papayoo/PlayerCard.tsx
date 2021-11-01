import { identity } from "@boardgames/utils"

import {
  PlayerCardContainer,
  PlayerCardProps,
  PlayerCardRow,
} from "components/ui/GameView/PlayerCard"

import { usePapayooPlayer } from "./store"

export function PlayerCard({ playerId }: PlayerCardProps) {
  const player = usePapayooPlayer(playerId, identity)

  return (
    <PlayerCardContainer>
      <PlayerCardRow>
        {player.name} ({player.score})
      </PlayerCardRow>
      <PlayerCardRow>{player.ready ? "Ready" : "Waiting..."}</PlayerCardRow>
    </PlayerCardContainer>
  )
}
