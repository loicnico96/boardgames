import {
  collection,
  DocumentData,
  limit,
  orderBy,
  query,
  Query,
  QueryConstraint,
  where,
} from "firebase/firestore"

import firestore from "lib/firebase/firestore"

import { QueryOptions } from "./types"

export function getQuery<T extends DocumentData>(
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
      const direction = sort.direction > 0 ? "asc" : "desc"
      constraints.push(orderBy(sort.field, direction))
    })
  }

  if (options.limit) {
    constraints.push(limit(options.limit))
  }

  return query(collection(firestore, colRef), ...constraints) as Query<T>
}
