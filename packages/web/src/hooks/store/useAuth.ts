import { AuthState } from "lib/auth/types"
import { GlobalStore, useGlobalStore } from "lib/store/global"

export function getAuth(store: GlobalStore): AuthState {
  return store.auth
}

export function useAuth(): AuthState {
  return useGlobalStore(getAuth)
}
