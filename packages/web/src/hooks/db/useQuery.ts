import { toError } from "@boardgames/utils"
import { DocumentData } from "firebase/firestore"
import { Firestore, QueryOptions, WithId } from "lib/firebase/firestore"
import { Logger } from "lib/utils/logger"
import {
  getErrorResource,
  getLoadedResource,
  LOADING,
  Resource,
} from "lib/utils/resource"
import { useCallback } from "react"
import useSWR from "swr"

export interface UseQueryResult<T extends DocumentData> {
  isValidating: boolean
  resource: Resource<WithId<T>[]>
  revalidate: () => Promise<void>
}

export function useQuery<T extends DocumentData>(
  colRef: string,
  options?: QueryOptions,
  onSuccess?: (data: WithId<T>[]) => void,
  onError?: (error: Error) => void
): UseQueryResult<T> {
  const key = getQueryKey(colRef, options)

  const { isValidating, data, mutate } = useSWR<Resource<WithId<T>[]>>(
    key,
    async () => {
      const logger = new Logger(`Query /${key}`)
      try {
        const result = await Firestore.query<T>(colRef, options)
        logger.log("Result", result)
        return getLoadedResource(result)
      } catch (error) {
        logger.error(toError(error))
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
        if (onSuccess && result.data) {
          onSuccess(result.data)
        }
        if (onError && result.error) {
          onError(result.error)
        }
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const revalidate = useCallback(async () => {
    await mutate()
  }, [mutate])

  return {
    isValidating,
    resource: data ?? LOADING,
    revalidate,
  }
}

function getQueryKey(colRef: string, options: QueryOptions = {}): string {
  const params: string[] = []

  if (options.filter?.length) {
    const filters = options.filter.map(filter => {
      const filterValue = encodeURIComponent(filter.value)
      return `eq(${filter.field}:${filterValue})`
    })

    params.push(`filter=${filters.join(",")}`)
  }

  if (options.limit) {
    params.push(`limit=${options.limit}`)
  }

  if (options.sort?.length) {
    const sortFields = options.sort.map(sort => {
      const direction = sort.direction > 0 ? "asc" : "desc"
      return `${direction}(${sort.field})`
    })

    params.push(`sort=${sortFields.join(",")}`)
  }

  return params.length ? `${colRef}?${params.join("&")}` : colRef
}
