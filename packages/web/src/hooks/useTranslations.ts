import { TranslationConfig } from "config/translations"
import CONFIG from "config/translations/locales/en/en.json"

export function useTranslations(): TranslationConfig {
  return CONFIG
}
