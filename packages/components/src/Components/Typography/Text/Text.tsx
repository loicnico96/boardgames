import styled from "@emotion/styled"
import { ReactNode } from "react"

export type TextProps = {
  alignment?: "left" | "right" | "center"
  children: ReactNode
}

export const Text = styled.p<TextProps>`
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  text-align: ${props => props.alignment ?? "left"};
`
