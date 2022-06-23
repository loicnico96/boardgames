import { assert } from "@boardgames/utils"
import { TranslationContext } from "lib/translations/context"
import { Translations } from "lib/translations/types"
import { useContext } from "react"

export function useTranslations(): Translations {
  const value = useContext(TranslationContext)
  assert(value !== null, "Invalid TranslationContext")
  return value
}
