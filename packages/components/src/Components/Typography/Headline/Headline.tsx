import styled from "@emotion/styled"

import { TextProps } from "Components/Typography/Text"

export const Headline = styled.h3<TextProps>`
  font-size: 1em;
  font-weight: 700;
  line-height: 1.5;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  text-align: ${props => props.alignment ?? "left"};
`
