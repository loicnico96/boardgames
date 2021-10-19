import { Text } from "Components/Typography/Text/stories"
import { meta, story } from "storybook"

import { Headline as Component } from "./Headline"

export default meta(Component, {
  group: "Typography",
  name: "Headline",
})

export const Headline = story(
  props => (
    <>
      <Component {...props}>{props.headline}</Component>
      <Text {...props} />
    </>
  ),
  {
    controls: {
      headline: "string",
      ...Text.controls,
    },
    defaults: {
      headline: "Component",
      ...Text.defaults,
    },
  }
)
