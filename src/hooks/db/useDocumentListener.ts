import { useEffect } from "react"

import { subscribe } from "lib/db/subscribe"
import { DocumentData, WithId } from "lib/db/types"
import cache from "lib/utils/cache"
import {
  getErrorResource,
  getLoadedResource,
  Resource,
} from "lib/utils/resources"

export function useDocumentListener<T extends DocumentData>(
  docRef: string | null,
  onChange: (resource: Resource<WithId<T>>) => void
): void {
  useEffect(() => {
    if (docRef) {
      return subscribe<T>(
        docRef,
        data => {
          const resource = data
            ? getLoadedResource(data)
            : getErrorResource(Error("Not found"))
          cache.set(docRef, resource)
          onChange(resource)
        },
        error => {
          onChange(getErrorResource(error))
        }
      )
    }

    return undefined
  }, [docRef, onChange])
}
