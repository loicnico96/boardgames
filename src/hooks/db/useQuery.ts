import { useCache, UseCacheResult } from "hooks/useCache"
import { query } from "lib/db/query"
import { DocumentData, QueryOptions, WithId } from "lib/db/types"
import cache from "lib/utils/cache"
import { getLoadedResource } from "lib/utils/resources"

export function getQueryKey(
  colRef: string,
  options: QueryOptions = {}
): string {
  const params: string[] = []

  if (options.filter) {
    const filterValue = options.filter
      .map(filter => {
        const operator = "eq"
        return `${operator}(${filter.field}:${encodeURIComponent(
          filter.value
        )})`
      })
      .join(",")

    params.push(`filter=${filterValue}`)
  }

  if (options.sort) {
    const sortValue = options.sort
      .map(sort => {
        const direction = sort.direction > 0 ? "asc" : "desc"
        return `${direction}(${sort.field})`
      })
      .join(",")

    params.push(`sort=${sortValue}`)
  }

  if (options.limit) {
    params.push(`limit=${options.limit}`)
  }

  return params.length > 0 ? `${colRef}?${params.join("&")}` : colRef
}

export function useQuery<T extends DocumentData>(
  colRef: string,
  options: QueryOptions = {},
  onComplete?: (data: WithId<T>[]) => void
): UseCacheResult<WithId<T>[]> {
  const key = getQueryKey(colRef, options)
  return useCache(key, async () => {
    const docs = await query<T>(colRef, options)
    docs.forEach(doc => cache.set(doc.id, getLoadedResource(doc)))
    if (onComplete) {
      onComplete(docs)
    }
    return docs
  })
}
