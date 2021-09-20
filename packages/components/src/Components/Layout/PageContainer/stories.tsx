import { PageContent } from "Components/Layout/PageContent/stories"
import { PageError } from "Components/Layout/PageError/stories"
import { PageHeader } from "Components/Layout/PageHeader/stories"
import { PageLoader } from "Components/Layout/PageLoader/stories"
import { meta, story } from "utils/storybook"

import { PageContainer as Component } from "./PageContainer"

export default meta(Component, {
  background: "dark",
  group: "Layout",
  name: "PageContainer",
})

export const Content = story(
  props => (
    <Component>
      <PageHeader {...props} />
      <PageContent {...props} />
    </Component>
  ),
  {
    controls: {
      ...PageContent.controls,
      ...PageHeader.controls,
    },
    defaults: {
      ...PageContent.defaults,
      ...PageHeader.defaults,
    },
  }
)

export const Error = story(
  props => (
    <Component>
      <PageHeader {...props} />
      <PageError {...props} />
    </Component>
  ),
  {
    controls: {
      ...PageError.controls,
      ...PageHeader.controls,
    },
    defaults: {
      ...PageError.defaults,
      ...PageHeader.defaults,
    },
  }
)

export const Loading = story(
  props => (
    <Component>
      <PageHeader {...props} />
      <PageLoader {...props} />
    </Component>
  ),
  {
    controls: {
      ...PageLoader.controls,
      ...PageHeader.controls,
    },
    defaults: {
      ...PageLoader.defaults,
      ...PageHeader.defaults,
    },
  }
)
