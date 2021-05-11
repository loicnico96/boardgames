import { useEffect } from "react"

import db, { DocumentData, WithId } from "lib/db"
import cache from "lib/utils/cache"
import {
  getErrorResource,
  getLoadedResource,
  Resource,
} from "lib/utils/resources"

export function useDocumentListener<T extends DocumentData>(
  docRef: string,
  onChange: (resource: Resource<WithId<T>>) => void
): void {
  useEffect(() => {
    const unsubscribe = db.subscribe<T>(
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

    return unsubscribe
  }, [docRef, onChange])
}
