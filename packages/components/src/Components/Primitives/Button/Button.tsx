import styled from "@emotion/styled"
import { useCallback } from "react"

import { ErrorHandler, useAsyncHandler } from "utils/hooks/useAsyncHandler"
import { computeStyleProps, StyleProps } from "utils/style"
import { If, IsNever } from "utils/types"

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
type ButtonClickHandler = (event: ButtonClickEvent) => unknown

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type StyledButtonProps = {
  fill?: boolean
}

export type ButtonTranslations<T extends string = never> = If<
  IsNever<T>,
  {
    label: string
    reason?: never
    tooltip?: string
  },
  {
    label: string
    reason: Record<T, string>
    tooltip?: string
  }
>

export type ButtonProps<T extends string = never> = Omit<
  BaseButtonProps,
  "onClick" | "onError" | "title"
> &
  StyledButtonProps &
  StyleProps & {
    onClick: ButtonClickHandler
    onError?: ErrorHandler
    reason?: T
    translations: ButtonTranslations<T>
  }

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

export function Button<T extends string = never>(props: ButtonProps<T>) {
  const {
    children,
    disabled = false,
    onClick,
    onError,
    reason,
    translations,
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
      title={
        translations.reason && reason
          ? translations.reason[reason]
          : translations.tooltip ?? translations.label
      }
      {...buttonProps}
    >
      {children ?? translations.label}
    </StyledButton>
  )
}
