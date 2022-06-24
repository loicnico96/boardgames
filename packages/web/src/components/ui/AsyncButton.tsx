import { Button, ButtonClickEvent, ButtonProps } from "@boardgames/components"

import { useAsyncHandler } from "hooks/useAsyncHandler"

import { Tooltip } from "./Tooltip"

export type ButtonTranslations = {
  label: string
  labelDisabled?: string
  labelLoading?: string
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
  const [onClickAsync, loading] = useAsyncHandler(onClick, onError)

  const label = loading
    ? translations.labelLoading ?? translations.label
    : disabled
    ? translations.labelDisabled ?? translations.label
    : translations.label

  const tooltip = loading ? undefined : reason ?? translations.tooltip

  return (
    <Tooltip text={tooltip} position="top">
      <Button disabled={disabled || loading} onClick={onClickAsync} {...props}>
        {label}
      </Button>
    </Tooltip>
  )
}
