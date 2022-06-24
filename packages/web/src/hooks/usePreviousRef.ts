import { MutableRefObject, useEffect, useRef } from "react"

export function usePreviousRef<T>(value: T): MutableRefObject<T | undefined> {
  const previousRef = useRef<T>()
  useEffect(() => {
    previousRef.current = value
  }, [value])
  return previousRef
}
