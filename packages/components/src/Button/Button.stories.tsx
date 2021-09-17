import { meta, stories } from "../utils/storybook"

import { Button } from "./Button"

export default meta(Button, {
  group: "Components",
  controls: {
    children: "text",
    disabled: "boolean",
    fill: "boolean",
    onClick: "fn",
    primary: "color",
    secondary: "color",
    title: "text",
  },
  defaults: {
    children: "Button",
    primary: "#0088ff",
    secondary: "white",
  },
})

export const Stories = stories(Button, {
  Default: {},
  Fill: {
    fill: true,
  },
  Disabled: {
    disabled: true,
  },
  DisabledFill: {
    disabled: true,
    fill: true,
  },
})
