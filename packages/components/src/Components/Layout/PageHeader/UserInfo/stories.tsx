import { meta, story } from "storybook"

import { UserInfo as Component } from "./UserInfo"

export default meta(Component, {
  group: "Layout",
})

export const UserInfo = story(Component, {
  controls: {
    onClick: "fn",
    userName: "string",
  },
  defaults: {
    userName: "User",
  },
})
