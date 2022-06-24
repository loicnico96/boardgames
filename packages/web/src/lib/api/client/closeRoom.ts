import { GenericHttpResponse, HttpMethod } from "lib/api/types"
import { RoutePath } from "lib/utils/navigation"

import { apiCall, apiPath } from "./utils"

export async function closeRoom(roomId: string): Promise<GenericHttpResponse> {
  return apiCall(HttpMethod.DELETE, apiPath(RoutePath.ROOMS, roomId))
}
