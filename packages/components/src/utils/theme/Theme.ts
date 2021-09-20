import { Theme } from "@emotion/react"

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string
      secondary: string
      background: string
    }
    fonts: string[]
  }
}

export type ThemeColor = keyof Theme["colors"]

export const defaultTheme: Theme = {
  colors: {
    primary: "#0088ff",
    secondary: "#44aaff",
    background: "#ffffff",
  },
  fonts: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Segoe UI",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
}
