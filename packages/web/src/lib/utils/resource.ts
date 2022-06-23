export interface LoadingResource {
  data: null
  error: null
  loading: true
}

export interface LoadedResource<T> {
  data: T
  error: null
  loading: false
}

export interface ErrorResource {
  data: null
  error: Error
  loading: false
}

export type Resource<T> = LoadingResource | LoadedResource<T> | ErrorResource

export const LOADING: LoadingResource = {
  data: null,
  error: null,
  loading: true,
}

export function getLoadedResource<T>(data: T): LoadedResource<T> {
  return { data, error: null, loading: false }
}

export function getErrorResource(error: Error): ErrorResource {
  return { data: null, error, loading: false }
}
