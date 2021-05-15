import { onAuthStateChanged as _onAuthStateChanged } from "firebase/auth"

import firebaseAuth from "lib/firebase/auth"
import { ErrorHandler } from "lib/utils/error"

import { formatUser } from "./formatUser"
import { AuthUser } from "./types"

export type Unsubscribe = () => void

export function onAuthStateChanged(
  onChange: (user: AuthUser | null) => void,
  onError: ErrorHandler
): Unsubscribe {
  return _onAuthStateChanged(
    firebaseAuth,
    firebaseUser => {
      try {
        onChange(firebaseUser ? formatUser(firebaseUser) : null)
      } catch (error) {
        onError(error)
      }
    },
    onError
  )
}
