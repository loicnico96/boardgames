import { AppProps } from "next/app"
import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import AuthProvider from "components/providers/AuthProvider"
import ToastProvider from "components/providers/ToastProvider"
import TranslationProvider from "components/providers/TranslationProvider"
import { HydrationContextProvider } from "lib/context/HydrationContext"
import { StoreProvider } from "lib/store/context"

const FONTS = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  "sans-serif",
].join(", ")

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    font-family: ${FONTS};
    height: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`

const theme = {
  // TODO
}

export default function App({ Component, pageProps }: AppProps) {
  // console.log("[Render] App")
  return (
    <HydrationContextProvider>
      <TranslationProvider>
        <ToastProvider>
          <StoreProvider>
            <AuthProvider>
              <ThemeProvider theme={theme}>
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
