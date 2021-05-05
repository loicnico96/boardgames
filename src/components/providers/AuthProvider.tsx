import React, { useEffect } from "react"

import { useActions } from "hooks/store/useActions"
import { onAuthStateChanged } from "lib/auth/onAuthStateChanged"
import { handleGenericError } from "lib/utils/error"

export type AuthProviderProps = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser } = useActions()

  useEffect(() => onAuthStateChanged(setUser, handleGenericError), [setUser])

  return <>{children}</>
}
