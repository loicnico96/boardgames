import { NextRouter, useRouter } from "next/router"
import { useCallback } from "react"

export type ParamState = string | null
export type SetParamState = (newState: ParamState) => void

export function getParam(router: NextRouter, key: string): ParamState {
  const rawParam = router.query[key]
  const strParam = Array.isArray(rawParam) ? rawParam[0] : rawParam
  return strParam ?? null
}

export function useParamState(key: string): [ParamState, SetParamState] {
  const router = useRouter()

  const setState = useCallback(
    (newState: ParamState) => {
      const oldState = getParam(router, key)
      if (router.isReady && newState !== oldState) {
        router.replace(
          {
            query: {
              ...router.query,
              [key]: newState,
            },
          },
          undefined,
          {
            shallow: true,
          }
        )
      }
    },
    [key, router]
  )

  return [getParam(router, key), setState]
}
