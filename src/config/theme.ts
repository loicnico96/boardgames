import { DefaultTheme } from "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: string[]
  }
}

export const defaultTheme: DefaultTheme = {
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
