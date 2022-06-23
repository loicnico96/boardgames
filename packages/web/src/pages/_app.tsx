import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { AppProps } from "next/app"

import { AuthProvider } from "components/providers/AuthProvider"
import { ToastProvider } from "components/providers/ToastProvider"
import { TooltipProvider } from "components/providers/TooltipProvider"
import { TranslationProvider } from "components/providers/TranslationProvider"
import { ErrorBoundary } from "components/ui/ErrorBoundary"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <TranslationProvider>
          <ToastProvider>
            <TooltipProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </TooltipProvider>
          </ToastProvider>
        </TranslationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
