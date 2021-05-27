import { produce } from "immer"
import React, { createContext, useContext, useState } from "react"
import create, { UseStore } from "zustand"
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
        Debug.log(logName, "Before:", get())
        set(produce(recipe))
        Debug.log(logName, "After:", get())
      }, get)
      return { actions }
    })
  )
}

const StoreContext = createContext<UseStore<Store> | null>(null)

export type StoreProviderProps = {
  children: React.ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [value] = useState(createStore)

  return React.createElement(StoreContext.Provider, { value }, children)
}

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
