import { TranslationConfig } from "config/translations"
import CONFIG from "config/translations/locales/en"

export function useTranslations(): TranslationConfig {
  return CONFIG
}
