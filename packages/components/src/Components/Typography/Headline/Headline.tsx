import styled from "@emotion/styled"
import { ReactNode } from "react"

export interface HeadlineProps {
  children: ReactNode
}

const StyledHeadline = styled.h3`
  font-size: 1em;
  font-weight: 700;
  line-height: 1.5;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`

export function Headline({ children }: HeadlineProps) {
  return <StyledHeadline>{children}</StyledHeadline>
}
