import { AuthState, AuthUser } from "lib/auth/types"

export type Actions = {
  setUser: (user: AuthUser | null) => void
  setUserName: (userName: string) => Promise<void>
  signInAnonymously: (persistence: boolean) => Promise<void>
  signInWithGoogle: (persistence: boolean) => Promise<void>
  signOut: () => Promise<void>
}

export type State = {
  auth: AuthState
}

export type Store = State & {
  actions: Actions
}
