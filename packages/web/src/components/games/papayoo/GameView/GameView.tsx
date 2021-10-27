import { useCallback } from "react"

import { useCurrentUserId } from "hooks/store/useCurrentUserId"

import { usePapayooState } from "../store"

import { PlayCardField } from "./PlayCardField"
import { PlayerHand } from "./PlayerHand"
import { SwapCardField } from "./SwapCardField"

export function GameView() {
  const userId = useCurrentUserId()

  const phase = usePapayooState(useCallback(state => state.phase, []))

  const playerId = usePapayooState(
    useCallback(
      state =>
        userId !== null && state.playerOrder.includes(userId) ? userId : null,
      [userId]
    )
  )

  const currentPlayerId = usePapayooState(
    useCallback(state => state.currentPlayerId, [])
  )

  if (playerId) {
    return (
      <>
        {phase === "playCard" && <PlayCardField />}
        {phase === "swapCard" && <SwapCardField playerId={playerId} />}
        <PlayerHand isCurrentUser playerId={playerId} />
      </>
    )
  } else {
    return (
      <>
        {phase === "playCard" && <PlayCardField />}
        <PlayerHand playerId={currentPlayerId} />
      </>
    )
  }
}
