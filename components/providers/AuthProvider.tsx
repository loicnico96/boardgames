import React, { useEffect, ReactNode } from "react"

import { useActions } from "hooks/store/useActions"
import { formatUser } from "lib/auth/formatUser"
import auth from "lib/firebase/auth"

export type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useActions()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async user => {
        try {
          setUser(user ? await formatUser(user) : null)
        } catch (error) {
          console.error(error)
        }
      },
      error => {
        console.error(error)
      }
    )

    return unsubscribe
  }, [setUser])

  return <>{children}</>
}
