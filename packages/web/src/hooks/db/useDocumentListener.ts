import { useEffect } from "react"

import { subscribe } from "lib/db/subscribe"
import { DocumentData, WithId } from "lib/db/types"
import { Logger } from "lib/utils/logger"
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
      const logger = new Logger(`Document /${docRef}`)

      return subscribe<T>(
        docRef,
        data => {
          if (data) {
            logger.log("Update", data)
            onChange(getLoadedResource(data))
          } else {
            logger.error("Not found")
            onChange(getErrorResource(Error("Not found")))
          }
        },
        error => {
          logger.error(error)
          onChange(getErrorResource(error))
        }
      )
    }

    return undefined
  }, [docRef, onChange])
}
