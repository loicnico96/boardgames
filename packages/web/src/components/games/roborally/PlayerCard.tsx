import {
  PlayerCardContainer,
  PlayerCardProps,
  PlayerCardRow,
} from "components/ui/GameView/PlayerCard"

import { useRoborallyPlayer, useRoborallyState } from "./store"

export function PlayerCard({ playerId }: PlayerCardProps) {
  const checkpoint = useRoborallyPlayer(playerId, player => player.checkpoint)
  const checkpointCount = useRoborallyState(
    state => state.checkpoints.length - 1
  )
  const damage = useRoborallyPlayer(playerId, player => player.damage)
  const name = useRoborallyPlayer(playerId, player => player.name)
  const ready = useRoborallyPlayer(playerId, player => player.ready)

  return (
    <PlayerCardContainer>
      <PlayerCardRow>{name}</PlayerCardRow>
      <PlayerCardRow>
        Checkpoint: {checkpoint} / {checkpointCount}
      </PlayerCardRow>
      <PlayerCardRow>Damage: {damage}</PlayerCardRow>
      <PlayerCardRow>{ready ? "Ready" : "Waiting..."}</PlayerCardRow>
    </PlayerCardContainer>
  )
}
