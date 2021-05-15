import { onSnapshot } from "firebase/firestore"

import { formatDoc } from "./formatDoc"
import { getDocRef } from "./getDocRef"
import { DocumentData, WithId } from "./types"

export function subscribe<T extends DocumentData>(
  docRef: string,
  onChange: (data: WithId<T> | null) => void,
  onError: (error: Error) => void
): () => void {
  return onSnapshot(
    getDocRef<T>(docRef),
    doc => onChange(doc.exists() ? formatDoc(doc) : null),
    onError
  )
}
