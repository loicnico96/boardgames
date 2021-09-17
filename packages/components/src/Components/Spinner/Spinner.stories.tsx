import { meta, stories } from "utils/storybook"

import { Spinner } from "./Spinner"

export default meta(Spinner, {
  group: "Components",
  controls: {
    size: "number",
  },
  defaults: {
    size: 32,
  },
})

export const Stories = stories(Spinner, {
  Default: {},
})
