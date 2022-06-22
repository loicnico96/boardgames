import { ReactNode, useState } from "react"

import CONFIG from "config/translations/locales/en/en.json"
import { TranslationsContext } from "lib/translations/context"
import { replace } from "lib/translations/utils"

export type TranslationProviderProps = {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [translations] = useState({ ...CONFIG, replace })

  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  )
}
