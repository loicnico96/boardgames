import { identity } from "@boardgames/utils"

import {
  PlayerCardContainer,
  PlayerCardProps,
  PlayerCardRow,
} from "components/ui/GameView/PlayerCard"

import { useCacaoPlayer, useCacaoState } from "./store"

export function PlayerCard({ playerId }: PlayerCardProps) {
  const over = useCacaoState(state => state.over)

  const { beans, coins, name, ready, sun, water } = useCacaoPlayer(
    playerId,
    identity
  )

  const waterScore = [-10, -4, -1, 0, 2, 4, 7, 11, 16][water]

  return (
    <PlayerCardContainer>
      <PlayerCardRow>
        {name} ({coins}pts)
      </PlayerCardRow>
      <PlayerCardRow>Cacao: {beans} / 5</PlayerCardRow>
      <PlayerCardRow>
        Water: {water} / 8 ({waterScore}pts)
      </PlayerCardRow>
      <PlayerCardRow>Sun disks: {sun} / 3</PlayerCardRow>
      <PlayerCardRow>
        {over
          ? `Final Score: ${coins + waterScore}pts`
          : ready
          ? "Ready"
          : "Waiting..."}
      </PlayerCardRow>
    </PlayerCardContainer>
  )
}
