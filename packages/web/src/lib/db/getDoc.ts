import { getDoc as getSingleDoc } from "firebase/firestore"

import { formatDoc } from "./formatDoc"
import { getDocRef } from "./getDocRef"
import { DocumentData, WithId } from "./types"

export async function getDoc<T extends DocumentData>(
  docRef: string
): Promise<WithId<T> | null> {
  const doc = await getSingleDoc(getDocRef<T>(docRef))
  return doc.exists() ? formatDoc(doc) : null
}
