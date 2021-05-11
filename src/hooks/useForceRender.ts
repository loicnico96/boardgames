import { useReducer } from "react"

export function useForceRender(): () => void {
  return useReducer(i => i + 1, 0)[1]
}
