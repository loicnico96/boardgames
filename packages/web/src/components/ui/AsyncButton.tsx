import { Button, ButtonClickEvent, ButtonProps } from "@boardgames/components"
import { useCallback } from "react"
import { toast } from "react-toastify"

import { useAsyncHandler } from "hooks/useAsyncHandler"

import { Tooltip } from "./Tooltip"

export type ButtonTranslations = {
  label: string
  labelDisabled?: string
  labelLoading?: string
  reason?: Record<string, string>
  success?: string
  tooltip?: string
}

export type AsyncButtonProps = Omit<
  ButtonProps,
  "children" | "onClick" | "onError" | "title"
> & {
  onClick: (event: ButtonClickEvent) => unknown
  onError?: (error: Error) => unknown
  reason?: string
  translations: ButtonTranslations
}

export function AsyncButton({
  disabled = false,
  onClick,
  onError,
  reason,
  translations,
  ...props
}: AsyncButtonProps) {
  const [onClickAsync, loading] = useAsyncHandler(
    useCallback(
      async (event: ButtonClickEvent) => {
        await onClick(event)
        if (translations.success) {
          toast.success(translations.success)
        }
      },
      [onClick, translations.success]
    ),
    onError
  )

  const label = loading
    ? translations.labelLoading ?? translations.label
    : disabled
    ? translations.labelDisabled ?? translations.label
    : translations.label

  const tooltip = loading
    ? undefined
    : reason && translations.reason
    ? translations.reason[reason] ?? translations.tooltip
    : translations.tooltip

  return (
    <Tooltip text={tooltip} position="top">
      <Button disabled={disabled || loading} onClick={onClickAsync} {...props}>
        {label}
      </Button>
    </Tooltip>
  )
}
