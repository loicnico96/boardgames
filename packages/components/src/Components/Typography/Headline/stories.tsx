import { Default as TextStory } from "Components/Typography/Text/stories"
import { meta, story } from "utils/storybook"

import { Headline } from "./Headline"

export default meta(Headline, {
  group: "Typography",
})

export const Default = story(
  props => (
    <>
      <Headline>{props.headline}</Headline>
      <TextStory {...props} />
    </>
  ),
  {
    controls: {
      headline: "string",
      ...TextStory.controls,
    },
    defaults: {
      headline: "Headline",
      ...TextStory.defaults,
    },
  }
)
