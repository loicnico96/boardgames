import { meta, story } from "utils/storybook"

import { Spinner as Component } from "./Spinner"

export default meta(Component, {
  group: "Primitives",
})

export const Spinner = story(Component, {
  controls: {
    size: "number",
  },
  defaults: {
    size: 32,
  },
})
