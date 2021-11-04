import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { AppProps } from "next/app"

import { AuthProvider } from "components/providers/AuthProvider"
import { ToastProvider } from "components/providers/ToastProvider"
import { TooltipProvider } from "components/providers/TooltipProvider"
import { GlobalStoreProvider } from "lib/store/global"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastProvider>
        <TooltipProvider>
          <GlobalStoreProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </GlobalStoreProvider>
        </TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
