import { Pos } from "@boardgames/utils"

import { makeUseGamePlayer } from "hooks/store/useGamePlayer"
import { makeUseGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/types"
import { createStore } from "lib/store/utils/createStore"

export const useCacaoState = makeUseGameState(GameType.CACAO)

export const useCacaoPlayer = makeUseGamePlayer(GameType.CACAO)

export type CacaoUiState = {
  forest: {
    index: number | null
    pos: Pos | null
  }
  forests: {
    index: number
    pos: Pos
  }[]
  village: {
    confirmed: boolean
    index: number | null
    pos: Pos | null
    rot: number
  }
}

export type CacaoUiActions = {
  confirmForestTile: () => void
  confirmVillageTile: () => void
  resetSelection: () => void
  rotateVillageTile: (rot: number) => void
  selectForestPosition: (x: number, y: number) => void
  selectForestTile: (index: number) => void
  selectVillagePosition: (x: number, y: number) => void
  selectVillageTile: (index: number) => void
}

export const {
  useActions: useCacaoActions,
  useStore: useCacaoStore,
  Provider: CacaoStoreProvider,
} = createStore<CacaoUiState, CacaoUiActions>(
  {
    forest: {
      index: null,
      pos: null,
    },
    forests: [],
    village: {
      confirmed: false,
      index: null,
      pos: null,
      rot: 0,
    },
  },
  (set, get) => ({
    confirmForestTile() {
      const { forest } = get()
      if (forest.index !== null && forest.pos !== null) {
        set({
          $merge: {
            forest: {
              index: forest.index === 0 ? 1 : 0,
              pos: null,
            },
          },
          forests: {
            $push: [{ index: forest.index, pos: forest.pos }],
          },
        })
      }
    },

    confirmVillageTile() {
      const { village } = get()
      if (village.index !== null && village.pos !== null) {
        set({
          village: {
            $merge: {
              confirmed: true,
            },
          },
        })
      }
    },

    resetSelection() {
      set({
        $merge: {
          forest: {
            index: null,
            pos: null,
          },
          forests: [],
          village: {
            confirmed: false,
            index: null,
            pos: null,
            rot: 0,
          },
        },
      })
    },

    rotateVillageTile(rot) {
      const { village } = get()
      if (!village.confirmed) {
        set({
          village: {
            rot: r => r + rot,
          },
        })
      }
    },

    selectForestPosition(x, y) {
      set({
        forest: {
          $merge: {
            pos: { x, y },
          },
        },
      })
    },

    selectForestTile(index) {
      set({
        forest: {
          $merge: {
            index,
            pos: null,
          },
        },
      })
    },

    selectVillagePosition(x, y) {
      const { village } = get()
      if (!village.confirmed) {
        set({
          $merge: {
            forest: {
              index: null,
              pos: null,
            },
            forests: [],
          },
          village: {
            $merge: {
              pos: { x, y },
            },
          },
        })
      }
    },

    selectVillageTile(index) {
      const { village } = get()
      if (!village.confirmed) {
        set({
          village: {
            $merge: {
              index,
              pos: null,
              rot: 0,
            },
          },
        })
      }
    },
  })
)
