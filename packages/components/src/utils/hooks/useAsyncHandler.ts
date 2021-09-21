import { useCallback, useState } from "react"

import { useMountedRef } from "./useMountedRef"

export type AsyncHandler<P extends unknown[]> = (...args: P) => Promise<void>
export type ErrorHandler = (error: Error) => void

export function useAsyncHandler<P extends unknown[]>(
  handler: AsyncHandler<P>,
  onError: ErrorHandler = console.error
): [AsyncHandler<P>, boolean] {
  const [isRunning, setIsRunning] = useState(false)

  const mountedRef = useMountedRef()

  const asyncHandler = useCallback(
    async (...args: P) => {
      try {
        setIsRunning(true)
        await handler(...args)
      } catch (error) {
        onError(error instanceof Error ? error : Error(String(error)))
      } finally {
        if (mountedRef.current) {
          setIsRunning(false)
        }
      }
    },
    [handler, mountedRef, onError]
  )

  return [asyncHandler, isRunning]
}
