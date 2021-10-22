import { GlobalStore, useGlobalStore } from "lib/store/global"

import { getAuth } from "./useAuth"

export function getCurrentUserId(store: GlobalStore): string | null {
  return getAuth(store).user?.userId ?? null
}

export function useCurrentUserId(): string | null {
  return useGlobalStore(getCurrentUserId)
}
