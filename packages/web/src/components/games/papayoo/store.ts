import { makeUseGamePlayer } from "hooks/store/useGamePlayer"
import { makeUseGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/types"
import { createStore } from "lib/store/utils/createStore"
import { remove } from "lib/utils/array"

export const usePapayooState = makeUseGameState(GameType.PAPAYOO)

export const usePapayooPlayer = makeUseGamePlayer(GameType.PAPAYOO)

export type PapayooUiState = {
  swap: {
    cards: number[]
  }
}

export type PapayooUiActions = {
  resetSwap: () => void
  swapCard: (card: number) => void
  unswapCard: (card: number) => void
}

export const {
  useActions: usePapayooActions,
  useStore: usePapayooStore,
  Provider: PapayooStoreProvider,
} = createStore<PapayooUiState, PapayooUiActions>(
  {
    swap: {
      cards: [],
    },
  },
  set => ({
    resetSwap() {
      set({
        swap: {
          cards: {
            $set: [],
          },
        },
      })
    },

    swapCard(card) {
      set({
        swap: {
          cards: {
            $push: [card],
          },
        },
      })
    },

    unswapCard(card) {
      set({
        swap: {
          cards: cards => remove(cards, card),
        },
      })
    },
  })
)
