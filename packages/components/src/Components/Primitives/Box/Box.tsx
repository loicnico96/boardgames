import styled from "@emotion/styled"

import { computeStyleProps, StyleProps } from "utils/style"

type BaseBoxProps = React.ButtonHTMLAttributes<HTMLDivElement>

export type BoxProps = BaseBoxProps &
  StyleProps & {
    alignment?: "start" | "end" | "center"
    direction?: "row" | "column"
    gap?: number
  }

const StyledDiv = styled.div<BoxProps>`
  align-items: ${props => props.alignment ?? "center"};
  cursor: ${props => (props.onClick ? "pointer" : "default")};
  display: flex;
  flex-direction: ${props => props.direction ?? "row"};
  gap: ${props => props.gap ?? 0}px;
`

export function Box(props: BoxProps) {
  const styledProps = computeStyleProps(props)
  return <StyledDiv {...styledProps} />
}
