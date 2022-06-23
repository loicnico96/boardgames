import { NotFoundError } from "lib/api/error"
import { DocumentData, Firestore, WithId } from "lib/firebase/firestore"
import { Logger } from "lib/utils/logger"
import {
  getErrorResource,
  getLoadedResource,
  Resource,
} from "lib/utils/resource"
import { useEffect } from "react"

export function useDocumentListener<T extends DocumentData>(
  docRef: string,
  onChange: (resource: Resource<WithId<T>>) => void
): void {
  useEffect(() => {
    const logger = new Logger(`Document /${docRef}`)

    return Firestore.subscribe<T>(
      docRef,
      data => {
        if (data) {
          logger.log("Update", data)
          onChange(getLoadedResource(data))
        } else {
          const error = new NotFoundError()
          logger.error(error)
          onChange(getErrorResource(error))
        }
      },
      error => {
        logger.error(error)
        onChange(getErrorResource(error))
      }
    )
  }, [])
}
