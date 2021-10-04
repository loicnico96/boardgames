import { Store, useStore } from "lib/store/context"

import { getAuth } from "./useAuth"

export function getCurrentUserId(store: Store): string | null {
  return getAuth(store).user?.userId ?? null
}

export function useCurrentUserId(): string | null {
  return useStore(getCurrentUserId)
}
