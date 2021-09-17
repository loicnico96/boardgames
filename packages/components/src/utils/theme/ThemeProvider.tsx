import { ThemeProvider as BaseThemeProvider } from "@emotion/react"
import { ReactNode } from "react"

import { GlobalStyle } from "./GlobalStyle"
import { defaultTheme } from "./Theme"

export interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <BaseThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      {children}
    </BaseThemeProvider>
  )
}
