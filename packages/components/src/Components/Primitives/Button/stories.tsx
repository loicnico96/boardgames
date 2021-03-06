import { meta, story } from "storybook"

import { Button as Component } from "./Button"

export default meta(Component, {
  group: "Primitives",
})

export const Button = story(
  ({ label, ...props }) => <Component {...props}>{label}</Component>,
  {
    controls: {
      disabled: "boolean",
      fill: "boolean",
      label: "string",
      onClick: "fn",
    },
    defaults: {
      disabled: false,
      fill: false,
      label: "Button",
    },
  }
)
