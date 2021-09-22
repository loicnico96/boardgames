import { Spec } from "immutability-helper"

import { AuthUser } from "lib/auth/types"
import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

import { State } from "./state"

export type Actions = {
  setRoomResources: (rooms: Record<string, Resource<WithId<RoomData>>>) => void
  setUser: (user: AuthUser | null) => void
  setUserName: (userName: string) => void
}

export type GetState = () => State
export type SetState = (action: string, spec: Spec<State>) => void

export function createActions(set: SetState): Actions {
  return {
    setRoomResources(rooms) {
      set("setRoomResources", {
        rooms: {
          $merge: rooms,
        },
      })
    },

    setUser(user) {
      set("setUser", {
        auth: {
          $merge: {
            loading: false,
            user,
          },
        },
      })
    },

    setUserName(userName) {
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
