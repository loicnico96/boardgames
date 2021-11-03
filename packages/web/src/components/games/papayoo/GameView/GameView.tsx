import { useCallback } from "react"

import { useCurrentUserId } from "hooks/useCurrentUserId"

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

  return (
    <>
      {phase === "playCard" && <PlayCardField />}
      {phase === "swapCard" && playerId !== null && (
        <SwapCardField playerId={playerId} />
      )}
      <PlayerHand playerId={playerId ?? currentPlayerId} />
    </>
  )
}
