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

export function getLoadingResource(): LoadingResource {
  return {
    data: null,
    error: null,
    loading: true,
  }
}

export function getLoadedResource<T>(data: T): LoadedResource<T> {
  return {
    data,
    error: null,
    loading: false,
  }
}

export function getErrorResource(error: Error): ErrorResource {
  return {
    data: null,
    error,
    loading: false,
  }
}
