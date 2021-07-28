import update from "immutability-helper"
import React, { useCallback, useState } from "react"
import create, { UseStore } from "zustand"
import createContext from "zustand/context"
import { combine } from "zustand/middleware"

import { Debug } from "lib/utils/debug"

import { Actions, createActions } from "./actions"
import { getInitialState, State } from "./state"

export type Store = State & {
  actions: Actions
}

export function createStore(): UseStore<Store> {
  return create(
    combine(getInitialState(), (set, get) => {
      const actions = createActions((logName, spec) => {
        set(state => update(state, spec))
        Debug.log(`[Store] ${logName}`, spec, get())
      }, get)
      return { actions }
    })
  )
}

const StoreContext = createContext<Store>()

export type StoreProviderProps = {
  children: React.ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(createStore)

  return (
    <StoreContext.Provider initialStore={store}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore<T>(selector: (store: Store) => T): T {
  return StoreContext.useStore(selector)
}

export function useComplexStore<T, U, P extends any[]>(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  selector: (store: Store, ...args: P) => T,
  reselector: (state: T) => U,
  ...args: P
): U {
  return StoreContext.useStore(
    useCallback(
      store => reselector(selector(store, ...args)),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [reselector, selector, ...args]
    )
  )
}
