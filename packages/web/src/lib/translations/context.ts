import { createContext } from "react"

import { Translations } from "./types"

export const TranslationContext = createContext<Translations | null>(null)
