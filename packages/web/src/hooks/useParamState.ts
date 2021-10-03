import update from "immutability-helper"
import { useRouter } from "next/router"
import { useCallback } from "react"

import { Console } from "lib/utils/logger"
import { Param } from "lib/utils/navigation"

import { getParam } from "./useParam"

export function useParamState(
  param: Param
): [
  state: string | null,
  setState: (newState: string | null) => Promise<void>
] {
  const router = useRouter()

  const state = getParam(router.query, param)

  const setState = useCallback(
    async (newState: string | null) => {
      const oldState = getParam(router.query, param)
      if (router.isReady && oldState !== newState) {
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
          Console.error(error)
        }
      }
    },
    [param, router]
  )

  return [state, setState]
}
