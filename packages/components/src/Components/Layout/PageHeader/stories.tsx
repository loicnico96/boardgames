import { meta, story } from "storybook"

import { Breadcrumbs } from "./Breadcrumbs/stories"
import { PageHeader as Component } from "./PageHeader"
import { UserInfo } from "./UserInfo/stories"

export default meta(Component, {
  group: "Layout",
})

export const PageHeader = story(
  ({ parents, title, onClick, userName }) => (
    <Component>
      <Breadcrumbs flex={1} parents={parents} title={title} />
      <UserInfo onClick={onClick} userName={userName} />
    </Component>
  ),
  {
    name: "PageHeader",
    controls: {
      ...Breadcrumbs.controls,
      ...UserInfo.controls,
    },
    defaults: {
      ...Breadcrumbs.defaults,
      ...UserInfo.defaults,
    },
  }
)
