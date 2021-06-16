import { Theme } from "@emotion/react"

declare module "@emotion/react" {
  export interface Theme {
    fonts: string[]
  }
}

export const defaultTheme: Theme = {
  fonts: [
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
  ],
}
