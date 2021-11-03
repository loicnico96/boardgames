import { generate } from "@boardgames/utils"

import { WithId } from "lib/db/types"
import { GameState, GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

import { createStore, Store } from "./utils/createStore"

export type RoomResource = Resource<WithId<RoomData>>

export type GlobalState = {
  games: { [T in GameType]: Partial<Record<string, Resource<GameState<T>>>> }
  rooms: Partial<Record<string, RoomResource>>
}

export type GlobalActions = {
  setGameResource: <T extends GameType>(
    game: T,
    roomId: string,
    resource: Resource<GameState<T>>
  ) => void
  setRoomResources: (resources: Record<string, RoomResource>) => void
}

export type GlobalStore = Store<GlobalState, GlobalActions>

export const initialState: GlobalState = {
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
          $merge: {
            [roomId]: resource,
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
