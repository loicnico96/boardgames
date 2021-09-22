import { Button, ButtonClickEvent, ButtonProps } from "@boardgames/components"

import { useAsyncHandler } from "hooks/useAsyncHandler"
import { If, IsNever } from "lib/utils/types"

export type BaseButtonTranslations = {
  label: string
  labelDisabled?: string
  labelLoading?: string
  tooltip?: string
}

export type ButtonTranslations<Reason extends string = never> = If<
  IsNever<Reason>,
  BaseButtonTranslations & { reason?: undefined },
  BaseButtonTranslations & { reason: Record<Reason, string> }
>

export type AsyncButtonProps<Reason extends string = never> = Omit<
  ButtonProps,
  "children" | "title"
> & {
  onClick: (event: ButtonClickEvent) => Promise<unknown>
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
  const [onClickAsync, loading] = useAsyncHandler(onClick, onError)

  const label = getLabel(translations, disabled, loading)
  const tooltip = getTooltip(translations, reason)

  return (
    <Button
      disabled={disabled || loading}
      onClick={onClickAsync}
      title={tooltip ?? label}
      {...props}
    >
      {label}
    </Button>
  )
}
