import { meta, story } from "utils/storybook"

import { PageError as Component } from "./PageError"

export default meta(Component, {
  group: "Layout",
})

export const PageError = story(Component, {
  controls: {
    error: "string",
  },
  defaults: {
    error: "An error occurred.",
  },
})
