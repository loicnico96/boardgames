import { meta, story } from "utils/storybook"

import { PageError } from "./PageError"

export default meta(PageError, {
  group: "Layout",
})

export const Default = story(PageError, {
  controls: {
    error: "string",
  },
  defaults: {
    error: "An error occurred.",
  },
})
