import { Default as ButtonStory } from "Components/Interface/Button/stories"
import { Default as HeadlineStory } from "Components/Typography/Headline/stories"
import { meta, story } from "utils/storybook"

import { PageContent } from "./PageContent"

export default meta(PageContent, {
  group: "Layout",
  name: "PageContent",
})

export const Default = story(
  props => (
    <PageContent>
      <HeadlineStory {...props} />
      <ButtonStory {...props} />
    </PageContent>
  ),
  {
    controls: {
      ...HeadlineStory.controls,
      ...ButtonStory.controls,
    },
    defaults: {
      ...HeadlineStory.defaults,
      ...ButtonStory.defaults,
    },
  }
)
