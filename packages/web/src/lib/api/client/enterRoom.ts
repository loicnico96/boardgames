import { GenericHttpResponse, HttpMethod } from "lib/api/types"

import { apiCall, apiPath } from "./utils"

export async function enterRoom(roomId: string): Promise<GenericHttpResponse> {
  return apiCall<GenericHttpResponse>(
    HttpMethod.POST,
    apiPath("rooms", roomId, "enter")
  )
}
