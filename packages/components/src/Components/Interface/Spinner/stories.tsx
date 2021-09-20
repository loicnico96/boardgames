import { meta, story } from "utils/storybook"

import { Spinner } from "./Spinner"

export default meta(Spinner, {
  group: "Interface",
})

export const Default = story(Spinner, {
  controls: {
    size: "number",
  },
  defaults: {
    size: 32,
  },
})
