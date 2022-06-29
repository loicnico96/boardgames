import { SortDir } from "@boardgames/utils"
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Query,
  QueryConstraint,
  QueryDocumentSnapshot,
  Unsubscribe,
  where,
} from "firebase/firestore"

import firebaseApp from "./app"

const firestore = getFirestore(firebaseApp)

export type DocumentData = {}

export type WithId<T extends DocumentData> = T & { id: string }

export type QueryFilter = {
  field: string
  value: string | number | boolean
}

export type QuerySortField = {
  field: string
  direction: SortDir
}

export type QueryOptions = {
  filter?: QueryFilter[]
  limit?: number
  sort?: QuerySortField[]
}

function formatDoc<T extends DocumentData>(
  docSnapshot: QueryDocumentSnapshot<T>
): WithId<T> {
  return Object.assign(docSnapshot.data(), { id: docSnapshot.id })
}

function getColRef<T extends DocumentData>(
  colRef: string
): CollectionReference<T> {
  return collection(firestore, colRef) as CollectionReference<T>
}

function getDocRef<T extends DocumentData>(
  docRef: string
): DocumentReference<T> {
  return doc(firestore, docRef) as DocumentReference<T>
}

function getQuery<T extends DocumentData>(
  colRef: string,
  options: QueryOptions = {}
): Query<T> {
  const constraints: QueryConstraint[] = []

  if (options.filter) {
    options.filter.forEach(filter => {
      constraints.push(where(filter.field, "==", filter.value))
    })
  }

  if (options.sort) {
    options.sort.forEach(sort => {
      constraints.push(orderBy(sort.field, sort.direction > 0 ? "asc" : "desc"))
    })
  }

  if (options.limit) {
    constraints.push(limit(options.limit))
  }

  return query(getColRef<T>(colRef), ...constraints)
}

export const Firestore = {
  async getDoc<T extends DocumentData>(
    docRef: string
  ): Promise<WithId<T> | null> {
    const snapshot = await getDoc(getDocRef<T>(docRef))
    return snapshot.exists() ? formatDoc(snapshot) : null
  },
  async query<T extends DocumentData>(
    colRef: string,
    options: QueryOptions = {}
  ): Promise<WithId<T>[]> {
    const snapshot = await getDocs(getQuery<T>(colRef, options))
    return snapshot.docs.map(formatDoc)
  },
  subscribe<T extends DocumentData>(
    docRef: string,
    onChange: (data: WithId<T> | null) => void,
    onError: (error: Error) => void
  ): Unsubscribe {
    return onSnapshot(
      getDocRef<T>(docRef),
      snapshot => onChange(snapshot.exists() ? formatDoc(snapshot) : null),
      onError
    )
  },
}
