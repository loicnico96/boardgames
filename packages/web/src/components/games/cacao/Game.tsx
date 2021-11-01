import { Box } from "@boardgames/components"

import { PlayerPanel } from "components/ui/GameView/PlayerPanel"

import { PlayerCard } from "./PlayerCard"
import { useCacaoState } from "./store"

export function Game() {
  const playerOrder = useCacaoState(state => state.playerOrder)

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        Cacao
      </Box>
      <PlayerPanel component={PlayerCard} playerOrder={playerOrder} />
    </Box>
  )
}
