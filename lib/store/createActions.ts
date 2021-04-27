import { setPersistence } from "lib/auth/setPersistence"
import { setUserName } from "lib/auth/setUserName"
import { signInAnonymously } from "lib/auth/signInAnonymously"
import { signInWithGoogle } from "lib/auth/signInWithGoogle"
import { signOut } from "lib/auth/signOut"
import { AuthUser } from "lib/auth/types"

import { Actions, GetState, SetState } from "./types"

export function createActions(set: SetState, get: GetState): Actions {
  return {
    setUser(user: AuthUser | null) {
      set(state => {
        state.auth.user = user
      })
    },

    async setUserName(userName: string) {
      await setUserName(userName)
      set(state => {
        if (state.auth.user) {
          state.auth.user.userInfo.userName = userName
        }
      })
    },

    async signInAnonymously(persistence: boolean) {
      await setPersistence(persistence)
      const user = await signInAnonymously()
      set(state => {
        state.auth.user = user
      })
    },

    async signInWithGoogle(persistence: boolean) {
      await setPersistence(persistence)
      const user = await signInWithGoogle()
      set(state => {
        state.auth.user = user
      })
    },

    async signOut() {
      await signOut()
      set(state => {
        state.auth.user = null
      })
    },
  }
}
