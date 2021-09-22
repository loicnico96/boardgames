import { useCallback } from "react"
import useSWR from "swr"

import { query } from "lib/db/query"
import { DocumentData, QueryOptions, WithId } from "lib/db/types"
import { toError } from "lib/utils/error"
import {
  getErrorResource,
  getLoadedResource,
  getLoadingResource,
  Resource,
} from "lib/utils/resource"

export function getQueryKey(
  colRef: string,
  options: QueryOptions = {}
): string {
  const params: string[] = []

  if (options.filter) {
    const filters = options.filter.map(filter => {
      const filterValue = encodeURIComponent(filter.value)
      return `eq(${filter.field}:${filterValue})`
    })

    params.push(`filter=${filters.join(",")}`)
  }

  if (options.sort) {
    const sortFields = options.sort.map(sort => {
      const direction = sort.direction > 0 ? "asc" : "desc"
      return `${direction}(${sort.field})`
    })

    params.push(`sort=${sortFields.join(",")}`)
  }

  if (options.limit) {
    params.push(`limit=${options.limit}`)
  }

  return params.length ? `${colRef}?${params.join("&")}` : colRef
}

export type UseQueryResult<T extends DocumentData> = {
  isValidating: boolean
  resource: Resource<WithId<T>[]>
  revalidate: () => Promise<void>
}

export function useQuery<T extends DocumentData>(
  colRef: string,
  options: QueryOptions = {},
  onSuccess?: (data: WithId<T>[]) => void,
  onError?: (error: Error) => void
): UseQueryResult<T> {
  const { data, isValidating, mutate } = useSWR<Resource<WithId<T>[]>>(
    getQueryKey(colRef, options),
    async () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Query] Options (${colRef})`, options)
      }

      try {
        const result = await query<T>(colRef, options)
        if (process.env.NODE_ENV === "development") {
          console.log(`[Query] Result (${colRef})`, result)
        }

        return getLoadedResource(result)
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(`[Query] Error (${colRef})`, error)
        }

        return getErrorResource(toError(error))
      }
    },
    {
      onError: error => {
        if (onError) {
          onError(toError(error))
        }
      },
      onSuccess: result => {
        if (result.data && onSuccess) {
          onSuccess(result.data)
        }
        if (result.error && onError) {
          onError(result.error)
        }
      },
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const revalidate = useCallback(async () => {
    await mutate()
  }, [mutate])

  return {
    isValidating,
    resource: data ?? getLoadingResource(),
    revalidate,
  }
}
