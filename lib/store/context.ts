import { createContext } from "react"
import { UseStore } from "zustand"

import { Store } from "./types"

export const StoreContext = createContext<UseStore<Store> | null>(null)

export const StoreContextProvider = StoreContext.Provider
