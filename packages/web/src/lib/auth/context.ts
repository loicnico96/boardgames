import { createContext, useContext } from "react"

import { AuthState, AuthUser } from "./types"

export type AuthContextValue = AuthState & {
  setUser: (user: AuthUser | null) => void
  setUserName: (userName: string) => void
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
  setUser: () => {
    throw Error("Invalid AuthContext - Did you forget to use AuthProvider?")
  },
  setUserName: () => {
    throw Error("Invalid AuthContext - Did you forget to use AuthProvider?")
  },
  user: null,
})

export function useAuthContext(): AuthContextValue {
  return useContext(AuthContext)
}
