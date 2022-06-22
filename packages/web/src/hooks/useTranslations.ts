import { assert } from "@boardgames/utils"
import { TranslationsContext } from "lib/translations/context"
import { Translations } from "lib/translations/types"
import { useContext } from "react"

export function useTranslations(): Translations {
  const value = useContext(TranslationsContext)
  assert(value !== null, "Invalid TranslationsContext")
  return value
}
