import styled from "@emotion/styled"
import { ReactNode } from "react"

export type BasicTileProps = {
  background?: string
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
  rot?: number
  selected?: boolean
  size?: number
  title?: string
}

export const StyledTile = styled.div<BasicTileProps>`
  align-items: center;
  background-color: ${props => props.background ?? "lightgray"};
  border: ${props =>
      props.selected
        ? "3px solid"
        : props.onClick && !props.disabled
        ? "2px dashed"
        : "1px solid"}
    black;
  display: flex;
  height: ${props => props.size ?? 60}px;
  justify-content: center;
  text-align: center;
  transform: rotate(${props => (props.rot ?? 0) * 90}deg);
  width: ${props => props.size ?? 60}px;
  ${props =>
    props.onClick
      ? `cursor: ${props.disabled ? "not-allowed" : "pointer"};`
      : ""}
`

export function BasicTile({ disabled, onClick, ...props }: BasicTileProps) {
  return (
    <StyledTile
      disabled={disabled}
      onClick={
        onClick &&
        (() => {
          if (!disabled) {
            onClick()
          }
        })
      }
      {...props}
    />
  )
}
