import { GetState, SetState } from "zustand"

import { setPersistence } from "lib/auth/setPersistence"
import { setUserName } from "lib/auth/setUserName"
import { signInAnonymously } from "lib/auth/signInAnonymously"
import { signInWithGoogle } from "lib/auth/signInWithGoogle"
import { signOut } from "lib/auth/signOut"
import { AuthUser } from "lib/auth/types"

import { Actions, State } from "./types"

export function createActions(
  set: SetState<State>,
  get: GetState<State>
): Actions {
  return {
    setUser(user: AuthUser | null) {
      set({ auth: { user } })
    },

    async setUserName(userName: string) {
      const { user } = get().auth
      if (user) {
        await setUserName(userName)
        set({
          auth: {
            user: {
              ...user,
              userInfo: {
                ...user.userInfo,
                userName,
              },
            },
          },
        })
      }
    },

    async signInAnonymously(persistence: boolean) {
      await setPersistence(persistence)
      const user = await signInAnonymously()
      set({ auth: { user } })
    },

    async signInWithGoogle(persistence: boolean) {
      await setPersistence(persistence)
      const user = await signInWithGoogle()
      set({ auth: { user } })
    },

    async signOut() {
      await signOut()
      set({ auth: { user: null } })
    },
  }
}
