import { NextRouter, useRouter } from "next/router"
import { useCallback } from "react"

import { handleGenericError } from "lib/utils/error"

export type UseParamStateResult = [
  string | null,
  (newState: string | null) => Promise<void>
]

export function getParam(router: NextRouter, key: string): string | null {
  const rawParam = router.query[key]
  return (Array.isArray(rawParam) ? rawParam[0] : rawParam) ?? null
}

export function useParamState(key: string): UseParamStateResult {
  const router = useRouter()

  const setState = useCallback(
    async (newState: string | null) => {
      const oldState = getParam(router, key)
      if (router.isReady && newState !== oldState) {
        try {
          await router.replace(
            {
              query: {
                ...router.query,
                [key]: newState ?? undefined,
              },
            },
            undefined,
            {
              shallow: true,
            }
          )
        } catch (error) {
          handleGenericError(error)
        }
      }
    },
    [key, router]
  )

  return [getParam(router, key), setState]
}
