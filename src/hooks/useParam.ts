import { NextRouter, useRouter } from "next/router"

import { Param } from "lib/utils/navigation"

export function getParam(router: NextRouter, param: Param): string | null {
  const rawParam = router.query[param]
  return (Array.isArray(rawParam) ? rawParam[0] : rawParam) ?? null
}

export function useParam(param: Param): string | null {
  return getParam(useRouter(), param)
}
