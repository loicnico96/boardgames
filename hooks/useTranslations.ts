import { useContext } from "react"

import { TranslationContext } from "components/providers/TranslationProvider"

export type { TranslationConfig } from "config/translations/types"

export function useTranslations() {
  return useContext(TranslationContext)
}
