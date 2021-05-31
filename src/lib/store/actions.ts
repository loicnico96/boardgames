import { Draft } from "immer"

import { AuthUser } from "lib/auth/types"
import { setUserName } from "lib/firebase/auth"
import { RoomData } from "lib/model/RoomData"
import { UnsafeRecord } from "lib/utils/objects"
import { Resource } from "lib/utils/resources"

import { State } from "./state"

export type Actions = {
  setRoomResources: (resources: UnsafeRecord<Resource<RoomData>>) => void
  setUser: (user: AuthUser | null) => void
  setUserName: (userName: string) => Promise<void>
}

export type GetState = () => State
export type SetState = (
  logName: string,
  recipe: (draft: Draft<State>) => void
) => void

export function createActions(set: SetState, get: GetState): Actions {
  return {
    setRoomResources(resources: UnsafeRecord<Resource<RoomData>>) {
      set("setRoomResources", state => {
        state.rooms = {
          ...state.rooms,
          ...resources,
        }
      })
    },

    setUser(user: AuthUser | null) {
      set("setUser", state => {
        state.auth = {
          loading: false,
          user,
        }
      })
    },

    async setUserName(userName: string) {
      await setUserName(userName)
      set("setUserName", state => {
        if (state.auth.user) {
          state.auth.user.userInfo.userName = userName
        }
      })
    },
  }
}
