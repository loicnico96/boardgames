import { NextRouter, useRouter } from "next/router"
import { useCallback } from "react"

import { getSearchParams } from "lib/utils/search"

export type ParamState = string | null
export type SetParamState = (newState: ParamState) => void

export function getParam(router: NextRouter, key: string): ParamState {
  const rawParam = router.query[key]
  const strParam = Array.isArray(rawParam) ? rawParam[0] : rawParam
  return strParam ?? null
}

export function useParamState(key: string): [ParamState, SetParamState] {
  const router = useRouter()

  const state = getParam(router, key)

  const setState = useCallback(
    (newState: ParamState) => {
      const oldState = getParam(router, key)
      if (router.isReady && newState !== oldState) {
        const params = getSearchParams(router)

        if (newState) {
          params.set(key, newState)
        } else {
          params.delete(key)
        }

        router.replace({ query: params.toString() }, undefined, {
          shallow: true,
        })
      }
    },
    [key, router]
  )

  return [state, setState]
}
