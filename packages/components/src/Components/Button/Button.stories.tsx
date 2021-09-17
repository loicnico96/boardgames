import { meta, stories } from "utils/storybook"

import { Button } from "./Button"

export default meta(Button, {
  group: "Components",
  controls: {
    children: "string",
    onClick: "fn",
    title: "string",
  },
  defaults: {
    children: "Button",
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
