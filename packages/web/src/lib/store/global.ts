import { AuthState, AuthUser } from "lib/auth/types"
import { WithId } from "lib/db/types"
import { GameState, GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { generate } from "lib/utils/array"
import { Resource } from "lib/utils/resource"

import { createStore, Store } from "./utils/createStore"

export type RoomResource = Resource<WithId<RoomData>>

export type GlobalState = {
  auth: AuthState
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
  setUser: (user: AuthUser | null) => void
  setUserName: (userName: string) => void
}

export type GlobalStore = Store<GlobalState, GlobalActions>

export const initialState: GlobalState = {
  auth: {
    loading: true,
    user: null,
  },
  games: generate(Object.values(GameType), game => [game, {}]),
  rooms: {},
}

export const {
  useActions: useGlobalActions,
  useStore: useGlobalStore,
  Provider: GlobalStoreProvider,
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

  setUser(user) {
    set({
      auth: {
        $merge: {
          loading: false,
          user,
        },
      },
    })
  },

  setUserName(userName) {
    set({
      auth: {
        user: {
          userInfo: {
            $merge: {
              userName,
            },
          },
        },
      },
    })
  },
}))
