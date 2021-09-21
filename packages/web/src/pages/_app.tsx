import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { AppProps } from "next/app"

import { AuthProvider } from "components/providers/AuthProvider"
import { createStore, StoreProvider } from "lib/store/context"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StoreProvider createStore={createStore}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
