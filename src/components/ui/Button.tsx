import { ButtonTranslation } from "config/translations/types"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { ErrorHandler } from "lib/utils/error"
import { computeStyleProps, StyleProps } from "lib/utils/style"

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
export type ButtonClickHandler = (event: ButtonClickEvent) => Promise<unknown>
export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps<Reason extends string> = Omit<
  BaseButtonProps,
  "onClick" | "onError" | "title"
> & {
  onClick: ButtonClickHandler
  onError?: ErrorHandler
  reason?: Reason
  translations: ButtonTranslation<Reason>
} & StyleProps

export default function Button<Reason extends string>(
  props: ButtonProps<Reason>
) {
  const {
    children,
    disabled = false,
    onClick,
    onError,
    reason,
    translations,
    ...otherProps
  } = computeStyleProps(props)

  const [onClickAsync, isRunning] = useAsyncHandler(onClick, onError)

  return (
    <button
      disabled={disabled || isRunning}
      onClick={onClickAsync}
      title={reason ? translations.reason[reason] : translations.tooltip}
      {...otherProps}
    >
      {children ?? translations.label}
    </button>
  )
}
