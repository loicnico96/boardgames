import { AppProps } from "next/app"
import React from "react"
import { ThemeProvider } from "styled-components"

import { GlobalStyle } from "components/layout/GlobalStyle"
import AuthProvider from "components/providers/AuthProvider"
import ToastProvider from "components/providers/ToastProvider"
import TranslationProvider from "components/providers/TranslationProvider"
import { defaultTheme } from "config/theme"
import { HydrationContextProvider } from "lib/context/HydrationContext"
import { StoreProvider } from "lib/store/context"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HydrationContextProvider>
      <TranslationProvider>
        <ToastProvider>
          <StoreProvider>
            <AuthProvider>
              <ThemeProvider theme={defaultTheme}>
                <GlobalStyle />
                <Component {...pageProps} />
              </ThemeProvider>
            </AuthProvider>
          </StoreProvider>
        </ToastProvider>
      </TranslationProvider>
    </HydrationContextProvider>
  )
}
