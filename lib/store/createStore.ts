import create, { UseStore } from "zustand"
import { combine } from "zustand/middleware"

import { createActions } from "./createActions"
import { getInitialState } from "./getInitialState"
import { Store } from "./types"

export function createStore(): UseStore<Store> {
  return create(
    combine(getInitialState(), (set, get) => {
      const actions = createActions(set, get)
      return { actions }
    })
  )
}
