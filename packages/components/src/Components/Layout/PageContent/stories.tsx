import { Button } from "Components/Primitives/Button/stories"
import { Box } from "Components/Primitives/Box"
import { Headline } from "Components/Typography/Headline/stories"
import { meta, story } from "utils/storybook"

import { PageContent as Component } from "./PageContent"

export default meta(Component, {
  group: "Layout",
  name: "PageContent",
})

export const PageContent = story(
  ({ disabled, onClick, ...props }) => (
    <Component>
      <Headline {...props} />
      <Box gap={8}>
        <Button disabled={disabled} onClick={onClick} label="Button 1" />
        <Button disabled={disabled} onClick={onClick} label="Button 2" fill />
      </Box>
    </Component>
  ),
  {
    name: "PageContent",
    controls: {
      ...Headline.controls,
      disabled: "boolean",
      onClick: "fn",
    },
    defaults: {
      ...Headline.defaults,
      disabled: false,
    },
  }
)
