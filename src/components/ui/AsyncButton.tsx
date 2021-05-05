import React from "react"

import { useAsyncHandler } from "hooks/useAsyncHandler"
import { ErrorHandler } from "lib/utils/error"

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
export type ButtonClickHandler = (event: ButtonClickEvent) => Promise<void>
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type AsyncButtonProps = Omit<ButtonProps, "onClick" | "onError"> & {
  onClick: ButtonClickHandler
  onError?: ErrorHandler
}

export default function AsyncButton(props: AsyncButtonProps) {
  const { disabled = false, onClick, onError, ...restProps } = props

  const [onClickAsync, isRunning] = useAsyncHandler(onClick, onError)

  return (
    <button
      disabled={disabled || isRunning}
      onClick={onClickAsync}
      {...restProps}
    />
  )
}
