import styled from "@emotion/styled"

import { ButtonTranslation } from "config/translations/types"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { ErrorHandler } from "lib/utils/error"
import { computeStyleProps, StyleProps } from "lib/utils/style"

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
export type ButtonClickHandler = (event: ButtonClickEvent) => Promise<unknown>
export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type StyledButtonProps = {
  fill?: boolean
  primary: string
  secondary: string
}

export type ButtonProps<Reason extends string> = Omit<
  BaseButtonProps,
  "onClick" | "onError" | "title"
> & {
  onClick: ButtonClickHandler
  onError?: ErrorHandler
  reason?: Reason
  translations: ButtonTranslation<Reason>
} & StyleProps &
  Partial<StyledButtonProps>

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${props => (props.fill ? props.secondary : props.primary)};
  border-radius: 12px;
  border: ${props => props.secondary} 2px inset;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.16);
  color: ${props => (props.fill ? props.primary : props.secondary)};
  cursor: pointer;
  padding: 4px 12px;
  text-decoration: none;
  transition-duration: 0.2s;

  &:active,
  &:hover:not(:disabled) {
    background-color: ${props => props.secondary};
    color: ${props => props.primary};
  }

  &:active {
    border-style: outset;
    box-shadow: none;
  }

  &:disabled {
    box-shadow: none;
    color: ${props => (props.fill ? props.primary : props.secondary)};
    cursor: not-allowed;
    opacity: 0.48;
  }

  &:hover:not(:active):not(:disabled) {
    box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.16);
  }
`

export default function Button<Reason extends string>(
  props: ButtonProps<Reason>
) {
  const {
    children,
    disabled = false,
    onClick,
    onError,
    primary = "#fff",
    reason,
    secondary = "#444",
    translations,
    ...otherProps
  } = computeStyleProps(props)

  const [onClickAsync, isRunning] = useAsyncHandler(onClick, onError)

  return (
    <StyledButton
      disabled={disabled || isRunning}
      onClick={onClickAsync}
      primary={primary}
      secondary={secondary}
      title={reason ? translations.reason[reason] : translations.tooltip}
      {...otherProps}
    >
      {children ?? translations.label}
    </StyledButton>
  )
}
