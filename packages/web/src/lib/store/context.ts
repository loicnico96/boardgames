import update from "immutability-helper"
import create, { UseStore } from "zustand"
import createContext from "zustand/context"
import { combine } from "zustand/middleware"

import { Actions, createActions } from "./actions"
import { getInitialState, State } from "./state"

export type Store = State & {
  actions: Actions
}

export function createStore(): UseStore<Store> {
  return create(
    combine(getInitialState(), (set, get) => ({
      actions: createActions((action, spec) => {
        set(state => update(state, spec))
        if (process.env.NODE_ENV === "development") {
          console.log(`[Store] ${action}`, spec, get())
        }
      }),
    }))
  )
}

export const { Provider: StoreProvider, useStore } = createContext<Store>()
