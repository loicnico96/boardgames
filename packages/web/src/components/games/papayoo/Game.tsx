import { Box } from "@boardgames/components"
import { useCallback } from "react"

import { useCurrentUserId } from "hooks/store/useCurrentUserId"

import { GameBanner } from "./GameBanner"
import { GameView } from "./GameView"
import { PlayerPanel } from "./PlayerPanel"
import { usePapayooState } from "./store"

export function Game() {
  const userId = useCurrentUserId()

  const playerId = usePapayooState(
    useCallback(
      state => {
        const { playerOrder } = state
        if (userId !== null && playerOrder.includes(userId)) {
          return userId
        } else {
          return null
        }
      },
      [userId]
    )
  )

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        {playerId !== null && <GameBanner playerId={playerId} />}
        <GameView />
      </Box>
      <PlayerPanel />
    </Box>
  )
}
