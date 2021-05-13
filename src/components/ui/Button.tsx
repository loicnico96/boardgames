import React from "react"

import { useAsyncHandler } from "hooks/useAsyncHandler"
import { ErrorHandler } from "lib/utils/error"
import { computeStyleProps, StyleProps } from "lib/utils/style"

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
export type ButtonClickHandler = (event: ButtonClickEvent) => Promise<void>
export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = Omit<BaseButtonProps, "onClick" | "onError"> & {
  onClick: ButtonClickHandler
  onError?: ErrorHandler
} & StyleProps

export default function Button(props: ButtonProps) {
  const {
    disabled = false,
    onClick,
    onError,
    ...otherProps
  } = computeStyleProps(props)

  const [onClickAsync, isRunning] = useAsyncHandler(onClick, onError)

  return (
    <button
      disabled={disabled || isRunning}
      onClick={onClickAsync}
      {...otherProps}
    />
  )
}
