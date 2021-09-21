import { Theme, ThemeProvider as BaseThemeProvider } from "@emotion/react"
import { ReactNode } from "react"

import { GlobalStyle } from "./GlobalStyle"

export interface ThemeProviderProps {
  children: ReactNode
  theme: Theme
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return (
    <BaseThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </BaseThemeProvider>
  )
}
