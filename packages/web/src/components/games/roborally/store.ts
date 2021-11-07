import { makeUseGamePlayer } from "hooks/store/useGamePlayer"
import { makeUseGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/types"
import { createStore } from "lib/store/utils/createStore"

export const useRoborallyState = makeUseGameState(GameType.ROBORALLY)

export const useRoborallyPlayer = makeUseGamePlayer(GameType.ROBORALLY)

export type RoborallyUiState = {
  powerDown: boolean
  program: (number | null)[]
}

export type RoborallyUiActions = {
  addProgram: (card: number) => void
  removeProgram: (index: number) => void
  resetSelection: () => void
  setPowerDown: (powerDown: boolean) => void
}

export const {
  useActions: useRoborallyActions,
  useStore: useRoborallyStore,
  Provider: RoborallyStoreProvider,
} = createStore<RoborallyUiState, RoborallyUiActions>(
  {
    powerDown: false,
    program: [null, null, null, null, null],
  },
  (set, get) => ({
    addProgram(card) {
      const { program } = get()
      const index = program.indexOf(null)
      if (index >= 0) {
        set({
          program: {
            $splice: [[index, 1, card]],
          },
        })
      }
    },

    removeProgram(index) {
      set({
        program: {
          $splice: [[index, 1, null]],
        },
      })
    },

    resetSelection() {
      set({
        $merge: {
          powerDown: false,
          program: [null, null, null, null, null],
        },
      })
    },

    setPowerDown(powerDown) {
      set({
        $merge: {
          powerDown,
        },
      })
    },
  })
)
