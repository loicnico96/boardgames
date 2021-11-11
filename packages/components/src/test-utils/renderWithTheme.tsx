import { render, RenderResult } from "@testing-library/react"
import { ReactElement } from "react"

import { defaultTheme, ThemeProvider } from "utils/theme"

export function renderWithTheme(element: ReactElement): RenderResult {
  return render(<ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>)
}

export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
