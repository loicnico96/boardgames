import { getDocs } from "firebase/firestore"

import { formatDoc } from "./formatDoc"
import { getQuery } from "./getQuery"
import { DocumentData, QueryOptions, WithId } from "./types"

export async function query<T extends DocumentData>(
  colRef: string,
  options: QueryOptions = {}
): Promise<WithId<T>[]> {
  const { docs } = await getDocs(getQuery<T>(colRef, options))
  return docs.map(formatDoc)
}
