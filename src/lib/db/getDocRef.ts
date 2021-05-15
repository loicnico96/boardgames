import { doc, DocumentReference } from "firebase/firestore"

import firestore from "lib/firebase/firestore"

import { DocumentData } from "./types"

export function getDocRef<T extends DocumentData>(
  docRef: string
): DocumentReference<T> {
  return doc(firestore, docRef) as DocumentReference<T>
}
