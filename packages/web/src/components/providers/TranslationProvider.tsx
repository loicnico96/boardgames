import { ReactNode, useState } from "react"

import CONFIG from "config/translations/locales/en/en.json"
import { TranslationContext } from "lib/translations/context"
import { replace } from "lib/translations/utils"

export type TranslationProviderProps = {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [translations] = useState({ ...CONFIG, replace })

  return (
    <TranslationContext.Provider value={translations}>
      {children}
    </TranslationContext.Provider>
  )
}
