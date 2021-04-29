import { AppProps } from "next/app"
import React from "react"

import AuthProvider from "components/providers/AuthProvider"
import ToastProvider from "components/providers/ToastProvider"
import TranslationProvider from "components/providers/TranslationProvider"
import { StoreProvider } from "lib/store/context"

import "styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider>
      <ToastProvider>
        <StoreProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </StoreProvider>
      </ToastProvider>
    </TranslationProvider>
  )
}
