import { meta, story } from "storybook"

import { Link as Component } from "./Link"

export default meta(Component, {
  group: "Primitives",
})

export const Link = story(
  ({ label, target }) => <Component href={target}>{label}</Component>,
  {
    controls: {
      label: "string",
      target: "string",
    },
    defaults: {
      label: "Link",
      target: "/target",
    },
  }
)
