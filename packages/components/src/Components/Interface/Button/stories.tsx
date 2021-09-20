import { meta, story } from "utils/storybook"

import { Button } from "./Button"

export default meta(Button, {
  group: "Interface",
})

export const Default = story(
  props => (
    <>
      <Button {...props} marginRight={8}>
        {props.label}
      </Button>
      <Button {...props} disabled>
        {props.label}
      </Button>
    </>
  ),
  {
    controls: {
      label: "string",
      onClick: "fn",
    },
    defaults: {
      label: "Button",
      fill: false,
    },
  }
)

export const Fill = story(
  props => (
    <>
      <Button {...props} marginRight={8}>
        {props.label}
      </Button>
      <Button {...props} disabled>
        {props.label}
      </Button>
    </>
  ),
  {
    controls: {
      label: "string",
      onClick: "fn",
    },
    defaults: {
      label: "Button",
      fill: true,
    },
  }
)
