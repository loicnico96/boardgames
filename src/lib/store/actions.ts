import { Spec } from "immutability-helper"

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
export type SetState = (logName: string, spec: Spec<State>) => void

export function createActions(set: SetState, get: GetState): Actions {
  return {
    setRoomResources(resources: UnsafeRecord<Resource<RoomData>>) {
      set("setRoomResources", {
        rooms: {
          $merge: resources,
        },
      })
    },

    setUser(user: AuthUser | null) {
      set("setUser", {
        auth: {
          $merge: {
            loading: false,
            user,
          },
        },
      })
    },

    async setUserName(userName: string) {
      await setUserName(userName)
      set("setUserName", {
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
  }
}
