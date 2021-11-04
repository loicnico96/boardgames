import { generate } from "@boardgames/utils"

import { WithId } from "lib/db/types"
import { GameState, GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

import { createStore, Store } from "./utils/createStore"

export type RoomResource = Resource<WithId<RoomData>>

export type GlobalState = {
  games: {
    [T in GameType]: {
      rooms: {
        [roomId in string]?: Resource<GameState<T>>
      }
    }
  }
  rooms: {
    [roomId in string]?: Resource<RoomData>
  }
}

export type GlobalActions = {
  setGameState: <T extends GameType>(
    game: T,
    roomId: string,
    resource: Resource<GameState<T>>
  ) => void
  setRoomResources: (resources: {
    [roomId in string]?: Resource<RoomData>
  }) => void
}

export type GlobalStore = Store<GlobalState, GlobalActions>

export const initialState: GlobalState = {
  games: generate(Object.values(GameType), game => [game, { rooms: {} }]),
  rooms: {},
}

export const {
  Provider: GlobalStoreProvider,
  useActions: useGlobalActions,
  useGetState: useGlobalState,
  useStore: useGlobalStore,
} = createStore<GlobalState, GlobalActions>(initialState, set => ({
  setGameState(game, roomId, resource) {
    set({
      games: {
        [game]: {
          rooms: {
            $merge: {
              [roomId]: resource,
            },
          },
        },
      },
    })
  },

  setRoomResources(resources) {
    set({
      rooms: {
        $merge: resources,
      },
    })
  },
}))
