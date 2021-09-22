export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

export type DocumentData = Record<string, unknown>

export type WithId<T extends DocumentData> = T & { id: string }

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
