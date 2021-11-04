import styled from "@emotion/styled"
import { ReactNode } from "react"
import ReactTooltip from "react-tooltip"

export type TooltipProviderProps = {
  children: ReactNode
}

const TooltipContainer = styled(ReactTooltip)`
  max-width: 240px;
  white-space: pre-wrap;
`

export function TooltipProvider({ children }: TooltipProviderProps) {
  return (
    <>
      <TooltipContainer multiline uuid="tooltip" />
      {children}
    </>
  )
}

export function rebuildTooltips() {
  ReactTooltip.rebuild()
}
