import { AuthState } from "lib/auth/types"
import { Store, useStore } from "lib/store/context"

export function getAuth(store: Store): AuthState {
  return store.auth
}

export function useAuth(): AuthState {
  return useStore(getAuth)
}
