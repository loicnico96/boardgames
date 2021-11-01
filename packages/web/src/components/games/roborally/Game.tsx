import { Box } from "@boardgames/components"

import { PlayerPanel } from "components/ui/GameView/PlayerPanel"

import { PlayerCard } from "./PlayerCard"
import { useRoborallyState } from "./store"

export function Game() {
  const playerOrder = useRoborallyState(state => state.playerOrder)

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        Roborally
      </Box>
      <PlayerPanel component={PlayerCard} playerOrder={playerOrder} />
    </Box>
  )
}
