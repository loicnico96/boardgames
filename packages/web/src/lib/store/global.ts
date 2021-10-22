import { AuthState, AuthUser } from "lib/auth/types"
import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

import { createStore, Store } from "./utils/createStore"

export type RoomResource = Resource<WithId<RoomData>>

export type GlobalState = {
  auth: AuthState
  rooms: Partial<Record<string, RoomResource>>
}

export type GlobalActions = {
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
  rooms: {},
}

export const useGlobalStore = createStore<GlobalState, GlobalActions>(
  initialState,
  set => ({
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
  })
)

export const GlobalStoreProvider = useGlobalStore.Provider
