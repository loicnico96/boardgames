import { meta, story } from "utils/storybook"

import { PageLoader } from "./PageLoader"

export default meta(PageLoader, {
  group: "Layout",
})

export const Default = story(PageLoader, {
  controls: {
    message: "string",
  },
})

export const Message = story(PageLoader, {
  controls: {
    message: "string",
  },
  defaults: {
    message: "Loading...",
  },
})
