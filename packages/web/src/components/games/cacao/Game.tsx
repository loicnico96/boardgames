import { Box } from "@boardgames/components"

import { PlayerPanel } from "components/ui/GameView/PlayerPanel"
import { useCurrentUserId } from "hooks/useCurrentUserId"

import { GameBanner } from "./GameBanner"
import { GameView } from "./GameView"
import { PlayerCard } from "./PlayerCard"
import { useCacaoState } from "./store"

export function Game() {
  const userId = useCurrentUserId()
  const playerOrder = useCacaoState(state => state.playerOrder)
  const playerId =
    userId !== null && playerOrder.includes(userId) ? userId : null

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        {playerId !== null && <GameBanner playerId={playerId} />}
        <GameView playerId={playerId} />
      </Box>
      <PlayerPanel component={PlayerCard} playerOrder={playerOrder} />
    </Box>
  )
}
