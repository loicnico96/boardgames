import { ReactNode, useEffect } from "react"

import { useActions } from "hooks/store/useActions"
import { onAuthStateChange } from "lib/firebase/auth"
import { Console } from "lib/utils/logger"

export type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useActions()

  useEffect(() => onAuthStateChange(setUser, Console.error), [setUser])

  return <>{children}</>
}
