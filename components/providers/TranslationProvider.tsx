import React, { createContext } from "react"

import CONFIG_EN from "config/translations/en"

export type TranslationProviderProps = {
  children: React.ReactNode
}

export const TranslationContext = createContext(CONFIG_EN)

export default function TranslationProvider({
  children,
}: TranslationProviderProps) {
  return (
    <TranslationContext.Provider value={CONFIG_EN}>
      {children}
    </TranslationContext.Provider>
  )
}
