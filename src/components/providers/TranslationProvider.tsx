import { createContext, ReactNode } from "react"

import CONFIG_EN from "config/translations/en"

export type TranslationProviderProps = {
  children: ReactNode
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
