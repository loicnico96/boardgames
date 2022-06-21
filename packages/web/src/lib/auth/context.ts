import { assert } from "@boardgames/utils"
import { createContext, useContext } from "react"

import { AuthState, AuthUser, AuthUserInfo } from "./types"

export type AuthContextValue = AuthState & {
  signInAnonymously: (userName: string) => Promise<AuthUser>
  signInWithGoogle: () => Promise<AuthUser>
  signOut: () => Promise<void>
  updateUserProfile: (userInfo: Partial<AuthUserInfo>) => Promise<AuthUser>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuthContext(): AuthContextValue {
  const contextValue = useContext(AuthContext)
  assert(contextValue !== null, "Invalid AuthContext")
  return contextValue
}
