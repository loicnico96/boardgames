import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"

import { Param } from "lib/utils/navigation"

export function getParam(query: ParsedUrlQuery, param: Param): string | null {
  const value = query[param]
  return (Array.isArray(value) ? value[0] : value) ?? null
}

export function useParam(param: Param): string | null {
  return getParam(useRouter().query, param)
}
