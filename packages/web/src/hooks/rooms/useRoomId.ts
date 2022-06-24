import { assert } from "@boardgames/utils"
import { getParam, RouteParam } from "lib/utils/navigation"
import { useRouter } from "next/router"

export function useRoomId(): string {
  const router = useRouter()
  const roomId = getParam(router.query, RouteParam.ROOM)
  assert(!!roomId, `Invalid room path - '${RouteParam.ROOM}' is not defined`)
  return roomId
}
