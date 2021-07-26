import update from "immutability-helper"
import { useRouter } from "next/router"
import { useCallback } from "react"

import { handleGenericError } from "lib/utils/error"
import { Param } from "lib/utils/navigation"

import { getParam } from "./useParam"

export type UseParamStateResult = [
  state: string | null,
  setState: (newState: string | null) => Promise<void>,
  isReady: boolean
]

export function useParamState(param: Param): UseParamStateResult {
  const router = useRouter()

  const setState = useCallback(
    async (newState: string | null) => {
      const oldState = getParam(router, param)
      if (router.isReady && newState !== oldState) {
        try {
          const query = update(
            router.query,
            newState
              ? {
                  $merge: {
                    [param]: newState,
                  },
                }
              : {
                  $unset: [param],
                }
          )

          await router.replace({ query }, undefined, { shallow: true })
        } catch (error) {
          handleGenericError(error)
        }
      }
    },
    [param, router]
  )

  return [getParam(router, param), setState, router.isReady]
}
