import styled from "@emotion/styled"

import { computeStyleProps, StyleProps } from "utils/style"

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type StyledButtonProps = {
  fill?: boolean
}

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>

export type ButtonProps = BaseButtonProps & StyledButtonProps & StyleProps

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${props =>
    props.fill ? props.theme.colors.primary : props.theme.colors.background};
  border: ${props => props.theme.colors.primary} 2px outset;
  border-radius: 16px;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.16);
  color: ${props =>
    props.fill ? props.theme.colors.background : props.theme.colors.primary};
  cursor: pointer;
  padding: 4px 12px;
  text-decoration: none;
  transition-duration: 0.2s;

  &:active,
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }

  &:active {
    border-style: inset;
    box-shadow: none;
  }

  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.48;
  }

  &:hover:not(:active):not(:disabled) {
    box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.16);
  }
`

export function Button(props: ButtonProps) {
  const styledProps = computeStyleProps(props)
  return <StyledButton {...styledProps} />
}
