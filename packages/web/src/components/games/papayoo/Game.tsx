import { Box } from "@boardgames/components"

import { useCurrentUserId } from "hooks/store/useCurrentUserId"

import { PlayCardBanner } from "./PlayCardBanner"
import { PlayCardField } from "./PlayCardField"
import { PlayerHand } from "./PlayerHand"
import { PlayerPanel } from "./PlayerPanel"
import { usePapayooStore } from "./store"
import { SwapCardBanner } from "./SwapCardBanner"
import { SwapCardField } from "./SwapCardField"

export function Game() {
  const userId = useCurrentUserId()
  const currentPlayerId = usePapayooStore(store => store.state.currentPlayerId)
  const phase = usePapayooStore(store => store.state.phase)
  const playerIds = usePapayooStore(store => store.state.playerOrder)

  const isPlayer = userId !== null && playerIds.includes(userId)

  if (isPlayer) {
    return (
      <Box alignment="start">
        <Box direction="column" flex={1}>
          {phase === "playCard" && <PlayCardBanner />}
          {phase === "swapCard" && <SwapCardBanner />}
          {phase === "playCard" && <PlayCardField />}
          {phase === "swapCard" && <SwapCardField playerId={userId} />}
          <PlayerHand isCurrentUser playerId={userId} />
        </Box>
        <PlayerPanel />
      </Box>
    )
  } else {
    return (
      <Box alignment="start">
        <Box direction="column" flex={1}>
          {phase === "playCard" && <PlayCardField />}
          <PlayerHand playerId={currentPlayerId} />
        </Box>
        <PlayerPanel />
      </Box>
    )
  }
}
