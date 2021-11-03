import update from "immutability-helper"
import { ReactNode, useCallback, useEffect, useState } from "react"

import { AuthContext, AuthContextValue } from "lib/auth/context"
import { AuthState, AuthUser } from "lib/auth/types"
import { onAuthStateChange } from "lib/firebase/auth"
import { Console } from "lib/utils/logger"

export type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  })

  const setUser = useCallback((user: AuthUser | null) => {
    setAuthState(state =>
      update(state, {
        $merge: {
          isAuthenticated: user !== null,
          isLoading: false,
          user,
        },
      })
    )
  }, [])

  const setUserName = useCallback((userName: string) => {
    setAuthState(state =>
      update(state, {
        user: {
          userInfo: {
            $merge: {
              userName,
            },
          },
        },
      })
    )
  }, [])

  const value: AuthContextValue = {
    ...authState,
    setUser,
    setUserName,
  }

  useEffect(() => onAuthStateChange(setUser, Console.error), [setUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
