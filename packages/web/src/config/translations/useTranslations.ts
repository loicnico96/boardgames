import CONFIG from "./locales/en"

export type TranslationConfig = typeof CONFIG

export function useTranslations(): TranslationConfig {
  return CONFIG
}
