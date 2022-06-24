import { generate } from "@boardgames/utils"

import { GameType } from "lib/games/types"
import { GameData } from "lib/model/GameData"
import { RoomData } from "lib/model/RoomData"
import { LOADING, Resource } from "lib/utils/resource"

import { createStore, Store } from "./utils"

export type GlobalState = {
  games: {
    [T in GameType]: {
      [R in string]?: Resource<GameData<T>>
    }
  }
  rooms: {
    [R in string]?: Resource<RoomData>
  }
}

export type GlobalActions = {
  setGameResource: <T extends GameType>(
    game: T,
    roomId: string,
    resource: Resource<GameData<T>>
  ) => void
  setRoomResources: (resources: {
    [R in string]?: Resource<RoomData>
  }) => void
}

export type GlobalStore = Store<GlobalState, GlobalActions>

const initialState: GlobalState = {
  games: generate(Object.values(GameType), game => [game, {}]),
  rooms: {},
}

export const {
  Provider: GlobalStoreProvider,
  useActions: useGlobalActions,
  useGetState: useGlobalState,
  useStore: useGlobalStore,
} = createStore<GlobalState, GlobalActions>(initialState, set => ({
  setGameResource(game, roomId, resource) {
    set({
      games: {
        [game]: {
          [roomId]: {
            $set: resource,
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

export function getGameResource<T extends GameType>(
  store: GlobalStore,
  game: T,
  roomId: string
): Resource<GameData<T>> {
  return store.games[game][roomId] ?? LOADING
}

export function getRoomResource(
  store: GlobalStore,
  roomId: string
): Resource<RoomData> {
  return store.rooms[roomId] ?? LOADING
}
