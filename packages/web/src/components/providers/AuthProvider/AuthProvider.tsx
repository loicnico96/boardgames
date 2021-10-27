import { ReactNode, useEffect } from "react"

import { onAuthStateChange } from "lib/firebase/auth"
import { useGlobalActions } from "lib/store/global"
import { Console } from "lib/utils/logger"

export type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useGlobalActions()

  useEffect(() => onAuthStateChange(setUser, Console.error), [setUser])

  return <>{children}</>
}
