import { QueryDocumentSnapshot } from "firebase/firestore"

import { DocumentData, WithId } from "./types"

export function formatDoc<T extends DocumentData>(
  doc: QueryDocumentSnapshot<T>
): WithId<T> {
  return Object.assign(doc.data(), { id: doc.id })
}
