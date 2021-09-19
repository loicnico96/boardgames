import { meta, story } from "utils/storybook"

import { Button, ButtonProps } from "./Button"

export default meta(Button, {
  group: "Interface",
  controls: {
    children: "string",
    fill: "boolean",
    onClick: "fn",
    title: "string",
  },
  defaults: {
    children: "Button",
  },
})

export const Default = story((props: ButtonProps) => (
  <>
    <Button {...props} marginRight={8} />
    <Button {...props} disabled />
  </>
))

export const Fill = story(
  (props: ButtonProps) => (
    <>
      <Button {...props} marginRight={8} />
      <Button {...props} disabled />
    </>
  ),
  { fill: true }
)
