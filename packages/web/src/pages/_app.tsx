import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { AppProps } from "next/app"

import { AuthProvider } from "components/providers/AuthProvider"
import { ToastProvider } from "components/providers/ToastProvider"
import { GlobalStoreProvider } from "lib/store/global"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastProvider>
        <GlobalStoreProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </GlobalStoreProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
