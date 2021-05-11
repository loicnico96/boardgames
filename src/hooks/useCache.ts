import { useCallback, useEffect } from "react"

import cache, { Loader } from "lib/utils/cache"
import { isSSR } from "lib/utils/navigation"
import { getLoadingResource, Resource } from "lib/utils/resources"

import { useForceRender } from "./useForceRender"

export type UseCacheResult<T> = [Resource<T>, () => Promise<void>]

export function useCache<T>(key: string, loader: Loader<T>): UseCacheResult<T> {
  const forceRender = useForceRender()
  useEffect(() => cache.subscribe(key, forceRender), [forceRender, key])
  const resource = isSSR() ? getLoadingResource() : cache.get(key, loader)
  const reload = useCallback(() => cache.reload(key), [key])
  return [resource, reload]
}
