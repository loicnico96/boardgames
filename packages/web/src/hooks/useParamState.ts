import update from "immutability-helper"
import { Console } from "lib/utils/logger"
import { getParam, RouteParam } from "lib/utils/navigation"
import { useRouter } from "next/router"
import { useCallback } from "react"

export function useParamState(
  param: RouteParam
): [state: string | null, setState: (state: string | null) => Promise<void>] {
  const router = useRouter()

  const state = getParam(router.query, param)

  const setState = useCallback(
    async (newState: string | null) => {
      const oldState = getParam(router.query, param)
      if (router.isReady && oldState !== newState) {
        const query = update(
          router.query,
          newState
            ? {
                $merge: { [param]: newState },
              }
            : {
                $unset: [param],
              }
        )

        try {
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
