export type LoadingResource = {
  data: null
  error: null
  loading: true
}

export type LoadedResource<T> = {
  data: T
  error: null
  loading: false
}

export type ErrorResource = {
  data: null
  error: Error
  loading: false
}

export type Resource<T> = LoadingResource | LoadedResource<T> | ErrorResource

export function isLoading<T>(res: Resource<T>): res is LoadingResource {
  return res.loading
}

export function getLoadingResource(): LoadingResource {
  return {
    data: null,
    error: null,
    loading: true,
  }
}

export function isLoaded<T>(res: Resource<T>): res is LoadedResource<T> {
  return res.data !== null
}

export function getLoadedResource<T>(data: T): LoadedResource<T> {
  return {
    data,
    error: null,
    loading: false,
  }
}

export function isError<T>(res: Resource<T>): res is ErrorResource {
  return res.error !== null
}

export function getErrorResource(error: Error): ErrorResource {
  return {
    data: null,
    error,
    loading: false,
  }
}
