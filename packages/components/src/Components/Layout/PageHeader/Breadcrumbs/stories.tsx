import { meta, story } from "storybook"

import { Breadcrumbs as Component } from "./Breadcrumbs"

export default meta(Component, {
  group: "Layout",
})

export const Breadcrumbs = story(Component, {
  controls: {
    parents: "object",
    title: "string",
  },
  defaults: {
    parents: [
      {
        path: "/parent/parent",
        title: "Parent 2",
      },
      {
        path: "/parent",
        title: "Parent 1",
      },
    ],
    title: "Title",
  },
})
