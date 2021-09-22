import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { AppProps } from "next/app"

import { AuthProvider } from "components/providers/AuthProvider"
import { ToastProvider } from "components/providers/ToastProvider"
import { createStore, StoreProvider } from "lib/store/context"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastProvider>
        <StoreProvider createStore={createStore}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </StoreProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
