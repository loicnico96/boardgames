import { Box } from "@boardgames/components"

import { PlayerPanel } from "components/ui/GameView/PlayerPanel"

import { PlayerCard } from "./PlayerCard"
import { useMetropolysState } from "./store"

export function Game() {
  const playerOrder = useMetropolysState(state => state.playerOrder)

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        Metropolys
      </Box>
      <PlayerPanel component={PlayerCard} playerOrder={playerOrder} />
    </Box>
  )
}
