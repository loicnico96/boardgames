import "@testing-library/jest-dom"

import { defaultTheme, ThemeProvider } from "@boardgames/components"
import { render } from "@testing-library/react"

import { AuthProvider } from "components/providers/AuthProvider"
import { ToastProvider } from "components/providers/ToastProvider"
import { GlobalStoreProvider } from "lib/store/global"
import HomePage from "pages"

describe("HomePage", () => {
  it("renders home page", () => {
    expect(
      render(
        <ThemeProvider theme={defaultTheme}>
          <ToastProvider>
            <GlobalStoreProvider>
              <AuthProvider>
                <HomePage />
              </AuthProvider>
            </GlobalStoreProvider>
          </ToastProvider>
        </ThemeProvider>
      )
    ).not.toBeNull()
  })
})
