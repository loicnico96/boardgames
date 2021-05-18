import { useReducer } from "react"

/**
 * Allows a component to force its own re-rendering.
 *
 * @returns A function that triggers re-rendering for the current component.
 */
export function useForceRender(): () => void {
  return useReducer(i => i + 1, 0)[1]
}
