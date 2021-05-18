import { MutableRefObject, useEffect, useRef } from "react"

/**
 * Retrieves whether the current component is currently mounted.
 *
 * @remarks
 *
 * This can be used, for example, to avoid some React warnings related to
 * calling setState on an unmounted component.
 *
 * @returns A React mutable reference, indicating whether the component is
 * currently mounted.
 */
export function useMountedRef(): MutableRefObject<boolean> {
  const mountedRef = useRef(true)

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return mountedRef
}
