import { GlobalActions, GlobalStore, useGlobalStore } from "lib/store/global"

export function getActions(store: GlobalStore): GlobalActions {
  return store.actions
}

export function useActions(): GlobalActions {
  return useGlobalStore(getActions)
}
