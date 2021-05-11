import firestore, {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Query,
} from "lib/firebase/firestore"

export type DocumentData = Record<string, unknown>

export type WithId<T extends DocumentData> = T & { id: string }

export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

export type QueryFilter = {
  field: string
  value: string | number | boolean
}

export type QuerySortField = {
  field: string
  direction: SortDirection
}

export type QueryOptions = {
  filter?: QueryFilter[]
  limit?: number
  sort?: QuerySortField[]
}

function formatDoc<T extends DocumentData>(
  doc: DocumentSnapshot<T>
): WithId<T> {
  return Object.assign(doc.data(), { id: doc.id })
}

function getDocRef<T extends DocumentData>(
  docRef: string
): DocumentReference<T> {
  return firestore.doc(docRef) as DocumentReference<T>
}

function getQuery<T extends DocumentData>(
  colRef: string,
  options: QueryOptions = {}
): Query<T> {
  let query: Query<T> = firestore.collection(colRef) as CollectionReference<T>

  if (options.filter) {
    options.filter.forEach(filter => {
      query = query.where(filter.field, "==", filter.value)
    })
  }

  if (options.sort) {
    options.sort.forEach(sort => {
      query = query.orderBy(sort.field, sort.direction > 0 ? "asc" : "desc")
    })
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  return query
}

export class Database {
  async get<T extends DocumentData>(docRef: string): Promise<WithId<T> | null> {
    const doc = await getDocRef<T>(docRef).get()
    return doc.exists ? formatDoc(doc) : null
  }

  async query<T extends DocumentData>(
    colRef: string,
    options: QueryOptions = {}
  ): Promise<WithId<T>[]> {
    const { docs } = await getQuery<T>(colRef, options).get()
    return docs.map(formatDoc)
  }

  subscribe<T extends DocumentData>(
    docRef: string,
    onSnapshot: (data: WithId<T> | null) => void,
    onError: (error: Error) => void
  ): () => void {
    return getDocRef<T>(docRef).onSnapshot(
      doc => {
        onSnapshot(doc.exists ? formatDoc(doc) : null)
      },
      error => {
        onError(error)
      }
    )
  }
}

export default new Database()
