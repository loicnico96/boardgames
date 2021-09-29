import update from "immutability-helper"
import create, { UseStore } from "zustand"
import createContext from "zustand/context"
import { combine } from "zustand/middleware"

import { Logger } from "lib/utils/logger"

import { Actions, createActions } from "./actions"
import { getInitialState, State } from "./state"

export type Store = State & {
  actions: Actions
}

export function createStore(): UseStore<Store> {
  const logger = new Logger("Store")

  return create(
    combine(getInitialState(), (set, get) => ({
      actions: createActions((action, spec) => {
        set(state => update(state, spec))
        logger.log(action, spec, get())
      }),
    }))
  )
}

export const { Provider: StoreProvider, useStore } = createContext<Store>()
