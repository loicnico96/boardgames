import { meta, story } from "storybook"

import { UserAvatar as Component } from "./UserAvatar"

export default meta(Component, {
  group: "Layout",
})

export const UserAvatar = story(Component, {
  controls: {
    imageUrl: "string",
    size: "number",
  },
  defaults: {
    size: 40,
  },
})
