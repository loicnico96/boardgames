import { meta, story } from "utils/storybook"

import { Spinner } from "./Spinner"

export default meta(Spinner, {
  group: "Interface",
  controls: {
    size: "number",
  },
  defaults: {
    size: 32,
  },
})

export const Default = story(Spinner)
