import { createContext } from "react"

import { Translations } from "./types"

export const TranslationsContext = createContext<Translations | null>(null)
