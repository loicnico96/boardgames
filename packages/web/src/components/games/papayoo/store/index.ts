import { GameType } from "lib/games/types"
import { createGameStore } from "lib/store/utils/createGameStore"
import { remove } from "lib/utils/array"
import { wait } from "lib/utils/performance"

export type PapayooUiState = {
  swap: number[]
}

export type PapayooUiActions = {
  swapCard: (card: number) => void
  unswapCard: (card: number) => void
}

export const usePapayooStore = createGameStore<
  GameType.PAPAYOO,
  PapayooUiState,
  PapayooUiActions
>(
  { swap: [] },
  () => wait(500),
  set => ({
    swapCard: card => set({ swap: { $push: [card] } }),
    unswapCard: card => set({ swap: cards => remove(cards, card) }),
  })
)
