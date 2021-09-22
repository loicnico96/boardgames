import { ReactNode, useEffect } from "react"

import { useActions } from "hooks/store/useActions"
import { onAuthStateChange } from "lib/firebase/auth"
import { handleGenericError } from "lib/utils/error"

export type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useActions()

  useEffect(() => onAuthStateChange(setUser, handleGenericError), [setUser])

  return <>{children}</>
}
