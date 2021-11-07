import { Box } from "@boardgames/components"

import { PlayerPanel } from "components/ui/GameView/PlayerPanel"
import { useCurrentUserId } from "hooks/useCurrentUserId"

import { GameBanner } from "./GameBanner"
import { GameBoard } from "./GameBoard"
import { PlayerCard } from "./PlayerCard"
import { PlayerHand } from "./PlayerHand"
import { PlayerProgram } from "./PlayerProgram"
import { useRoborallyState } from "./store"

export function Game() {
  const userId = useCurrentUserId()
  const playerOrder = useRoborallyState(state => state.playerOrder)
  const playerId =
    userId !== null && playerOrder.includes(userId) ? userId : null

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        {playerId !== null && <GameBanner playerId={playerId} />}
        <GameBoard />
        {playerId !== null && <PlayerProgram playerId={playerId} />}
        {playerId !== null && <PlayerHand playerId={playerId} />}
      </Box>
      <PlayerPanel component={PlayerCard} playerOrder={playerOrder} />
    </Box>
  )
}
