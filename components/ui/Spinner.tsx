import React from "react"

export const SPINNER_COLOR = "blue"
export const SPINNER_TYPE = "RevolvingDot"

export type SpinnerProps = {
  size: number
}

export default function Spinner({ size }: SpinnerProps) {
  return (
    <svg
      height={size}
      version="1.1"
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        fill="none"
        stroke={SPINNER_COLOR}
        strokeWidth={4}
        cx={50}
        cy={50}
        r={44}
        style={{ opacity: 0.5 }}
      />
      <circle
        fill={SPINNER_COLOR}
        stroke={SPINNER_COLOR}
        strokeWidth={3}
        cx={8}
        cy={54}
        r={6}
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}
