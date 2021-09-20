import { meta, story } from "utils/storybook"

import { Text } from "./Text"

export default meta(Text, {
  group: "Typography",
})

export const Default = story(
  props => (
    <>
      {Array(props.paragraphs)
        .fill(props.text)
        .map((content, index) => (
          <Text key={index} {...props}>
            {content}
          </Text>
        ))}
    </>
  ),
  {
    controls: {
      paragraphs: "number",
      text: "string",
    },
    defaults: {
      paragraphs: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non lectus eget justo gravida volutpat. Curabitur quis nisi at eros malesuada mollis. Etiam quis diam vitae tellus bibendum vulputate in ac ipsum. Mauris id ante id nisl iaculis tristique elementum fermentum urna. Nullam molestie felis a orci lobortis, vel maximus nisl venenatis. Donec eget consectetur massa, a ultricies eros. Quisque sodales placerat lorem, at pellentesque lorem blandit eu. Suspendisse eu ex consequat, vehicula risus eu, consequat ipsum. Mauris placerat ac eros ut aliquam. Duis dapibus nisi vitae sodales iaculis. Etiam luctus augue at felis ullamcorper, sed porta sapien feugiat.",
    },
  }
)
