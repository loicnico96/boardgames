import { NextApiRequest, NextApiResponse } from "next"

import { Validator } from "lib/utils/validation"

import { getUserId } from "./auth"
import { ApiError } from "./error"
import { handle } from "./rest"
import { ApiRequestCreateRoom, ApiResponseCreateRoom } from "./rooms/create"
import { ApiRequestEnterRoom, ApiResponseEnterRoom } from "./rooms/enter"
import { ApiRequestLeaveRoom, ApiResponseLeaveRoom } from "./rooms/leave"
import { HttpMethod, HttpStatus } from "./types"

export enum ApiTrigger {
  CREATE_ROOM = "/api/rooms/create",
  ENTER_ROOM = "/api/rooms/enter",
  LEAVE_ROOM = "/api/rooms/leave",
}

export type ApiRequest<T extends ApiTrigger> = {
  [ApiTrigger.CREATE_ROOM]: ApiRequestCreateRoom
  [ApiTrigger.ENTER_ROOM]: ApiRequestEnterRoom
  [ApiTrigger.LEAVE_ROOM]: ApiRequestLeaveRoom
}[T]

export type ApiResponse<T extends ApiTrigger> = {
  [ApiTrigger.CREATE_ROOM]: ApiResponseCreateRoom
  [ApiTrigger.ENTER_ROOM]: ApiResponseEnterRoom
  [ApiTrigger.LEAVE_ROOM]: ApiResponseLeaveRoom
}[T]

export function handleTrigger<T extends ApiTrigger>(
  validator: Validator<ApiRequest<T>>,
  handler: (data: ApiRequest<T>, userId: string) => Promise<ApiResponse<T>>
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return handle({
    [HttpMethod.POST]: async (request, logger) => {
      const userId = await getUserId(request, logger)
      let data: ApiRequest<T>

      try {
        data = validator(request.body)
      } catch (error) {
        throw new ApiError(HttpStatus.BAD_REQUEST, error.message)
      }

      return handler(data, userId)
    },
  })
}
