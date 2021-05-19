import { AppProps } from "next/app"
import React from "react"

import AuthProvider from "components/providers/AuthProvider"
import ToastProvider from "components/providers/ToastProvider"
import TranslationProvider from "components/providers/TranslationProvider"
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider>
      <ToastProvider>
        <StoreProvider>
          <AuthProvider>
            <Component {...pageProps} />
            <style jsx global>{`
              html,
              body,
              #__next {
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
            `}</style>
          </AuthProvider>
        </StoreProvider>
      </ToastProvider>
    </TranslationProvider>
  )
}
