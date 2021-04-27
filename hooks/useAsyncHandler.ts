import { useCallback, useState } from "react"

import { ErrorHandler, handleGenericError } from "lib/utils/error"

export type Params = unknown[]
export type AsyncHandler<P extends Params> = (...args: P) => Promise<void>

export function useAsyncHandler<P extends Params>(
  handler: AsyncHandler<P>,
  onError: ErrorHandler = handleGenericError
): [AsyncHandler<P>, boolean] {
  const [isRunning, setRunning] = useState(false)

  const asyncHandler = useCallback(
    async (...args: P) => {
      if (!isRunning) {
        try {
          setRunning(true)
          await handler(...args)
        } catch (error) {
          onError(error)
        } finally {
          setRunning(false)
        }
      }
    },
    [handler, isRunning, onError]
  )

  return [asyncHandler, isRunning]
}
