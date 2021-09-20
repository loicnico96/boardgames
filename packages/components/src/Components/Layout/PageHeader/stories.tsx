import { meta, story } from "utils/storybook"

import { Breadcrumbs } from "./Breadcrumbs/stories"
import { PageHeader as Component } from "./PageHeader"
import { UserInfo } from "./UserInfo/stories"

export default meta(Component, {
  group: "Layout",
})

export const PageHeader = story(
  ({ parents, title, onClick, userName }) => (
    <Component>
      <Breadcrumbs parents={parents} title={title} flex={1} />
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
