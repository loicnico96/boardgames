import { meta, story } from "utils/storybook"

import { Text as Component } from "./Text"

export default meta(Component, {
  group: "Typography",
  name: "Text",
})

export const Text = story(
  props => (
    <>
      {Array(props.paragraphs)
        .fill(props.text)
        .map((content, index) => (
          <Component key={index} {...props}>
            {content}
          </Component>
        ))}
    </>
  ),
  {
    controls: {
      alignment: ["left", "right", "center"] as const,
      paragraphs: "number",
      text: "string",
    },
    defaults: {
      alignment: "left",
      paragraphs: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non lectus eget justo gravida volutpat. Curabitur quis nisi at eros malesuada mollis. Etiam quis diam vitae tellus bibendum vulputate in ac ipsum. Mauris id ante id nisl iaculis tristique elementum fermentum urna. Nullam molestie felis a orci lobortis, vel maximus nisl venenatis. Donec eget consectetur massa, a ultricies eros. Quisque sodales placerat lorem, at pellentesque lorem blandit eu. Suspendisse eu ex consequat, vehicula risus eu, consequat ipsum. Mauris placerat ac eros ut aliquam. Duis dapibus nisi vitae sodales iaculis. Etiam luctus augue at felis ullamcorper, sed porta sapien feugiat.",
    },
  }
)
