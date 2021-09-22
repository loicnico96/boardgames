import { useLocation } from "./useLocation"

export type SearchParams = Record<string, string>

export function getSearchParams(path: string): URLSearchParams {
  return new URLSearchParams(path.split("?")[1])
}

export function useSearchParams(): URLSearchParams {
  return getSearchParams(useLocation())
}

export function useSearchParam(param: string): string | null {
  return useSearchParams().get(param)
}

export function withSearchParams(path: string, params: SearchParams): string {
  const search = new URLSearchParams(params).toString()
  return search ? `${path}?${search}` : path
}
