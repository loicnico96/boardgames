import { useCallback } from "react"

import { usePlayerAction } from "hooks/usePlayerAction"
import { getSwapCardCount } from "lib/games/papayoo/cards"
import { GameType } from "lib/games/types"

import { usePapayooStore, usePapayooState, usePapayooActions } from "../store"

export function useConfirmSwap() {
  const playerAction = usePlayerAction(GameType.PAPAYOO)

  const { resetSwap } = usePapayooActions()

  const swapCards = usePapayooStore(store => store.swap.cards)

  const swapCount = usePapayooState(state =>
    getSwapCardCount(state.playerOrder.length)
  )

  const trigger = useCallback(async () => {
    const success = await playerAction({ code: "swapCard", cards: swapCards })
    if (success) {
      resetSwap()
    }
  }, [playerAction, resetSwap, swapCards])

  return [trigger, swapCards.length !== swapCount] as const
}
