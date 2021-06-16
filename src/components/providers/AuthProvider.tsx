import { ReactNode, useEffect } from "react"

import { useActions } from "hooks/store/useActions"
import { onAuthStateChanged } from "lib/firebase/auth"
import { handleGenericError } from "lib/utils/error"

export type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useActions()

  useEffect(() => onAuthStateChanged(setUser, handleGenericError), [setUser])

  return <>{children}</>
}
