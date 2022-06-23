import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { AppProps } from "next/app"

import { AuthProvider } from "components/providers/AuthProvider"
import { ToastProvider } from "components/providers/ToastProvider"
import { TooltipProvider } from "components/providers/TooltipProvider"
import { TranslationProvider } from "components/providers/TranslationProvider"
import { ErrorBoundary } from "components/ui/ErrorBoundary"
import { GlobalStoreProvider } from "lib/store/global"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStoreProvider>
          <TranslationProvider>
            <ToastProvider>
              <TooltipProvider>
                <AuthProvider>
                  <Component {...pageProps} />
                </AuthProvider>
              </TooltipProvider>
            </ToastProvider>
          </TranslationProvider>
        </GlobalStoreProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
