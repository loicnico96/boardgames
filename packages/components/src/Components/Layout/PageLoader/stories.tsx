import { meta, story } from "storybook"

import { PageLoader as Component } from "./PageLoader"

export default meta(Component, {
  group: "Layout",
})

export const PageLoader = story(Component, {
  controls: {
    message: "string",
  },
  defaults: {
    message: "Loading...",
  },
})
