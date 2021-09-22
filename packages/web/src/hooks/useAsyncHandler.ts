import { useCallback, useState } from "react"

import { handleGenericError, toError } from "lib/utils/error"

import { useMountedRef } from "./useMountedRef"

export function useAsyncHandler<P extends unknown[]>(
  handler: (...args: P) => Promise<unknown>,
  onError: (error: Error) => unknown = handleGenericError
): [(...args: P) => Promise<void>, boolean] {
  const [isRunning, setIsRunning] = useState(false)

  const mountedRef = useMountedRef()

  const asyncHandler = useCallback(
    async (...args: P) => {
      try {
        setIsRunning(true)
        await handler(...args)
      } catch (error) {
        onError(toError(error))
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
