import { Auth } from "lib/firebase/auth"
import { ErrorHandler } from "lib/utils/error"

import { formatUser } from "./formatUser"
import { AuthUser } from "./types"

export type Unsubscribe = () => void

export function onAuthStateChanged(
  onChange: (user: AuthUser | null) => void,
  onError: ErrorHandler
): Unsubscribe {
  return Auth.onAuthStateChanged(
    firebaseUser => {
      try {
        onChange(firebaseUser ? formatUser(firebaseUser) : null)
      } catch (error) {
        onError(error)
      }
    },
    firebaseError => {
      const error = Error(firebaseError.message)
      error.name = firebaseError.code
      onError(error)
    }
  )
}
