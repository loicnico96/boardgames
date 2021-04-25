import { Actions, Store } from "lib/store/types"

import { useStore } from "./useStore"

export function getActions(store: Store): Actions {
  return store.actions
}

export function useActions(): Actions {
  return useStore(getActions)
}
