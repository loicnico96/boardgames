import { AuthState } from "lib/auth/types"
import { Store } from "lib/store/types"

import { useStore } from "./useStore"

export function getAuth(store: Store): AuthState {
  return store.auth
}

export function useAuth(): AuthState {
  return useStore(getAuth)
}
