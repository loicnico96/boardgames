import { NextRouter, useRouter } from "next/router"

export type SearchParams = Record<string, string>

export function getSearchParams(router: NextRouter): URLSearchParams {
  const start = router.asPath.indexOf("?")
  if (start >= 0) {
    return new URLSearchParams(router.asPath.slice(start))
  } else {
    return new URLSearchParams()
  }
}

export function useSearchParams(): URLSearchParams {
  const router = useRouter()
  if (router.isReady) {
    return getSearchParams(router)
  } else {
    return new URLSearchParams()
  }
}

export function withSearchParams(path: string, params: SearchParams): string {
  const search = new URLSearchParams(params).toString()
  return search ? `${path}?${search}` : path
}
