import { getParam, RouteParam } from "lib/utils/navigation"
import { useRouter } from "next/router"

export function useRouteParam(param: RouteParam): string | null {
  const { query } = useRouter()
  return getParam(query, param)
}
