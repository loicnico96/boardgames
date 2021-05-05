import { Actions } from "lib/store/actions"
import { Store, useStore } from "lib/store/context"

export function getActions(store: Store): Actions {
  return store.actions
}

export function useActions(): Actions {
  return useStore(getActions)
}
