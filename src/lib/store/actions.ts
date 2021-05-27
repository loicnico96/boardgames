import { Draft } from "immer"

import { AuthUser } from "lib/auth/types"
import { setUserName } from "lib/firebase/auth"

import { State } from "./state"

export type Actions = {
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
