import styled from "@emotion/styled"
import { ReactNode, useCallback } from "react"

import { ErrorHandler, useAsyncHandler } from "utils/hooks/useAsyncHandler"
import { computeStyleProps, StyleProps } from "utils/style"

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
type ButtonClickHandler = (event: ButtonClickEvent) => unknown

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type StyledButtonProps = {
  fill?: boolean
}

export type ButtonProps = Omit<BaseButtonProps, "onClick" | "onError"> &
  StyledButtonProps &
  StyleProps & {
    children: ReactNode
    onClick: ButtonClickHandler
    onError?: ErrorHandler
  }

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${props =>
    props.fill ? props.theme.colors.primary : props.theme.colors.secondary};
  border: ${props => props.theme.colors.primary} 2px outset;
  border-radius: 16px;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.16);
  color: ${props =>
    props.fill ? props.theme.colors.secondary : props.theme.colors.primary};
  cursor: pointer;
  padding: 4px 12px;
  text-decoration: none;
  transition-duration: 0.2s;

  &:active,
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.secondary};
  }

  &:active {
    border-style: inset;
    box-shadow: none;
  }

  &:disabled {
    box-shadow: none;
    //color: ${props =>
      props.fill ? props.theme.colors.secondary : props.theme.colors.primary};
    cursor: not-allowed;
    opacity: 0.48;
  }

  &:hover:not(:active):not(:disabled) {
    box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.16);
  }
`

export function Button(props: ButtonProps) {
  const {
    disabled = false,
    onClick,
    onError,
    ...buttonProps
  } = computeStyleProps(props)

  const [onClickAsync, isRunning] = useAsyncHandler(
    useCallback(
      async (event: ButtonClickEvent) => {
        await onClick(event)
      },
      [onClick]
    ),
    onError
  )

  return (
    <StyledButton
      disabled={disabled || isRunning}
      onClick={onClickAsync}
      {...buttonProps}
    />
  )
}
