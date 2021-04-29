export type SearchParams = Record<string, string>

export function getSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search)
}

export function withSearchParams(path: string, params: SearchParams): string {
  const search = new URLSearchParams(params).toString()
  return search ? `${path}?${search}` : path
}
