import { useEffect } from "react"

import { subscribe } from "lib/db/subscribe"
import { DocumentData, WithId } from "lib/db/types"
import {
  getErrorResource,
  getLoadedResource,
  Resource,
} from "lib/utils/resource"

export function useDocumentListener<T extends DocumentData>(
  docRef: string | null,
  onChange: (resource: Resource<WithId<T>>) => void
): void {
  useEffect(() => {
    if (docRef) {
      return subscribe<T>(
        docRef,
        data => {
          if (data) {
            if (process.env.NODE_ENV === "development") {
              console.log(`[Document] Update (${docRef})`, data)
            }

            onChange(getLoadedResource(data))
          } else {
            if (process.env.NODE_ENV === "development") {
              console.error(`[Document] Not found (${docRef})`)
            }

            onChange(getErrorResource(Error("Not found")))
          }
        },
        error => {
          if (process.env.NODE_ENV === "development") {
            console.error(`[Document] Error (${docRef})`, error)
          }

          onChange(getErrorResource(error))
        }
      )
    }

    return undefined
  }, [docRef, onChange])
}
