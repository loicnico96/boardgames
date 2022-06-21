import { Parameters } from "@storybook/react"

export type ParameterOptions = {
  background?: "light" | "dark"
}

export function getParameters({ background }: ParameterOptions): Parameters {
  return {
    backgrounds: {
      default: background,
    },
    controls: {
      sort: "alpha",
    },
  }
}
