import styled from "@emotion/styled"
import { cloneElement, ReactElement, useMemo } from "react"
import ReactTooltip from "react-tooltip"

export type TooltipProps = {
  children: ReactElement
  place?: "top" | "right" | "bottom" | "left"
  solid?: boolean
  text?: string
}

function generateTooltipId(): string {
  return `tooltip-${Math.random().toString(36).slice(2)}`
}

const TooltipContainer = styled(ReactTooltip)`
  max-width: 240px;
  white-space: pre-wrap;
`

export function Tooltip({
  children,
  place = "top",
  solid,
  text,
}: TooltipProps) {
  const tooltipId = useMemo(() => generateTooltipId(), [])

  if (!text) {
    return children
  }

  const childProps = {
    "data-for": tooltipId,
    "data-tip": text,
  }

  return (
    <>
      <TooltipContainer
        effect={solid ? "solid" : "float"}
        id={tooltipId}
        multiline
        place={place}
        type="dark"
      />
      {cloneElement(children, childProps)}
    </>
  )
}
