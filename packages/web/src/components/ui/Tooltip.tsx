import { ReactElement, useEffect } from "react"

import { rebuildTooltips } from "components/providers/TooltipProvider"

export type TooltipProps = {
  children: ReactElement
  position?: "top" | "right" | "bottom" | "left"
  text?: string
}

export function Tooltip({ children, position, text }: TooltipProps) {
  useEffect(() => {
    setTimeout(rebuildTooltips)
  }, [text])

  return (
    <span
      data-effect={position ? "solid" : "float"}
      data-place={position ?? "top"}
      data-tip={text}
    >
      {children}
    </span>
  )
}
