import create, { UseStore } from "zustand"

import { createActions } from "./createActions"
import { getInitialState } from "./getInitialState"
import { Store } from "./types"

export function createStore(): UseStore<Store> {
  return create<Store>((set, get) => {
    const actions = createActions(set, get)
    return Object.assign(getInitialState(), { actions })
  })
}
