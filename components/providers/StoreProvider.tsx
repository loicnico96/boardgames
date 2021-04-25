import React, { ReactNode, useState } from "react"

import { StoreContextProvider } from "lib/store/context"
import { createStore } from "lib/store/createStore"

export type StoreProviderProps = {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(() => createStore())

  return <StoreContextProvider value={store}>{children}</StoreContextProvider>
}
