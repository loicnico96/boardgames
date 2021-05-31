import { produce } from "immer"
import React, { useState } from "react"
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
      const actions = createActions((logName, recipe) => {
        set(produce(recipe))
        Debug.log(`[Store] ${logName}`, get())
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

export const { useStore } = StoreContext
