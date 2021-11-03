import { Button, ButtonClickEvent, ButtonProps } from "@boardgames/components"
import { If, IsNever } from "@boardgames/utils"
import { useCallback } from "react"
import { toast } from "react-toastify"

import { Tooltip } from "components/ui/Tooltip"
import { useAsyncHandler } from "hooks/useAsyncHandler"

export type BaseButtonTranslations = {
  label: string
  labelDisabled?: string
  labelLoading?: string
  success?: string
  tooltip?: string
}

export type ButtonTranslations<Reason extends string = never> = If<
  IsNever<Reason>,
  BaseButtonTranslations & { reason?: undefined },
  BaseButtonTranslations & { reason: Record<Reason, string> }
>

export type AsyncButtonProps<Reason extends string = never> = Omit<
  ButtonProps,
  "children" | "onClick" | "onError" | "title"
> & {
  onClick: (event: ButtonClickEvent) => unknown
  onError?: (error: Error) => unknown
  reason?: Reason
  translations: ButtonTranslations<Reason>
}

function getLabel<Reason extends string>(
  translations: ButtonTranslations<Reason>,
  disabled: boolean,
  loading: boolean
): string {
  if (disabled && translations.labelDisabled) {
    return translations.labelDisabled
  }

  if (loading && translations.labelLoading) {
    return translations.labelLoading
  }

  return translations.label
}

function getTooltip<Reason extends string>(
  translations: ButtonTranslations<Reason>,
  reason?: Reason
): string | undefined {
  if (reason && translations.reason) {
    return translations.reason[reason]
  }

  return translations.tooltip
}

export function AsyncButton<Reason extends string = never>({
  disabled = false,
  onClick,
  onError,
  reason,
  translations,
  ...props
}: AsyncButtonProps<Reason>) {
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

  const label = getLabel(translations, disabled, loading)
  const tooltip = getTooltip(translations, reason)

  return (
    <Tooltip solid text={tooltip}>
      <Button disabled={disabled || loading} onClick={onClickAsync} {...props}>
        {label}
      </Button>
    </Tooltip>
  )
}
