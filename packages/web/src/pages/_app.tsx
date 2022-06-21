import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { AppProps } from "next/app"

import { ToastProvider } from "components/providers/ToastProvider"
import { TooltipProvider } from "components/providers/TooltipProvider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastProvider>
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
