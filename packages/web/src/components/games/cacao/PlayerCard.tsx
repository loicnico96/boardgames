import { identity } from "@boardgames/utils"

import {
  PlayerCardContainer,
  PlayerCardProps,
  PlayerCardRow,
} from "components/ui/GameView/PlayerCard"

import { useCacaoPlayer } from "./store"

export function PlayerCard({ playerId }: PlayerCardProps) {
  const player = useCacaoPlayer(playerId, identity)

  return (
    <PlayerCardContainer>
      <PlayerCardRow>{player.name}</PlayerCardRow>
      <PlayerCardRow>{player.ready ? "Ready" : "Waiting..."}</PlayerCardRow>
    </PlayerCardContainer>
  )
}
