import CONFIG from "config/translations/locales/en/en.json"

export type ReplaceParams = Record<string, string | number>

export type TranslationsConfig = typeof CONFIG

export interface Translations extends TranslationsConfig {
  replace: (entry: string, params: ReplaceParams) => string
}
