import { Spec } from "immutability-helper"

import { AuthUser } from "lib/auth/types"

import { State } from "./state"

export type Actions = {
  setUser: (user: AuthUser | null) => void
  setUserName: (userName: string) => void
}

export type GetState = () => State
export type SetState = (action: string, spec: Spec<State>) => void

export function createActions(set: SetState): Actions {
  return {
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
