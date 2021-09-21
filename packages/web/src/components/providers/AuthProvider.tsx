import { ReactNode, useEffect } from "react"

import { useActions } from "hooks/store/useActions"
import { onAuthStateChange } from "lib/firebase/auth"

export type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useActions()

  useEffect(() => onAuthStateChange(setUser, console.error), [setUser])

  return <>{children}</>
}
