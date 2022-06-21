import { ReactNode, useEffect, useMemo, useState } from "react"

import { AuthContext, AuthContextValue } from "lib/auth/context"
import { AuthUser, AuthUserInfo } from "lib/auth/types"
import { FirebaseAuth } from "lib/firebase/auth"
import { Console } from "lib/utils/logger"

export type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>()

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: !!user,
      isLoading: user === undefined,
      signInAnonymously: async (userName: string) => {
        const newUser = await FirebaseAuth.signInAnonymously(userName)
        setUser(newUser)
        return newUser
      },
      signInWithGoogle: async () => {
        const newUser = await FirebaseAuth.signInWithGoogle()
        setUser(newUser)
        return newUser
      },
      signOut: async () => {
        await FirebaseAuth.signOut()
        setUser(null)
      },
      updateUserProfile: async (userInfo: Partial<AuthUserInfo>) => {
        const newUser = await FirebaseAuth.updateProfile(userInfo)
        setUser(newUser)
        return newUser
      },
      user: user ?? null,
    }),
    [user]
  )

  useEffect(() => FirebaseAuth.onAuthStateChanged(setUser, Console.error), [])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
