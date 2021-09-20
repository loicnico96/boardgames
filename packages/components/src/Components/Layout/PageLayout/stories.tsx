import { Default as PageContentStory } from "Components/Layout/PageContent/stories"
import { Default as PageErrorStory } from "Components/Layout/PageError/stories"
import { Message as PageLoaderStory } from "Components/Layout/PageLoader/stories"
import { meta, story } from "utils/storybook"

import { PageLayout } from "./PageLayout"

export default meta(PageLayout, {
  group: "Layout",
  background: "dark",
})

export const Default = story(
  props => (
    <PageLayout>
      <PageContentStory {...props} />
    </PageLayout>
  ),
  {
    controls: {
      ...PageContentStory.controls,
    },
    defaults: {
      ...PageContentStory.defaults,
    },
  }
)

export const Error = story(
  props => (
    <PageLayout>
      <PageErrorStory {...props} />
    </PageLayout>
  ),
  {
    controls: {
      ...PageErrorStory.controls,
    },
    defaults: {
      ...PageErrorStory.defaults,
    },
  }
)

export const Loading = story(
  props => (
    <PageLayout>
      <PageLoaderStory {...props} />
    </PageLayout>
  ),
  {
    controls: {
      ...PageLoaderStory.controls,
    },
    defaults: {
      ...PageLoaderStory.defaults,
    },
  }
)
