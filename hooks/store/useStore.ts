import { useContext } from "react"

import { StoreContext } from "lib/store/context"
import { Store } from "lib/store/types"

export function useStore<T>(
  selector: (store: Store) => T,
  eqFn?: (oldState: T, newState: T) => boolean
): T {
  const store = useContext(StoreContext)
  if (store) {
    return store(selector, eqFn)
  } else {
    throw Error("Invalid store context")
  }
}
