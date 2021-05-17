import { NextApiRequest } from "next"

import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"
import { Validator } from "lib/utils/validation"

import { ApiRequestCreateRoom, ApiResponseCreateRoom } from "./createRoom"

export enum ApiTrigger {
  CREATE_ROOM = "/api/rooms/create",
}

export type ApiRequest<T extends ApiTrigger> = {
  [ApiTrigger.CREATE_ROOM]: ApiRequestCreateRoom
}[T]

export type ApiResponse<T extends ApiTrigger> = {
  [ApiTrigger.CREATE_ROOM]: ApiResponseCreateRoom
}[T]

export function handleTrigger<T extends ApiTrigger>(
  validator: Validator<ApiRequest<T>>,
  handler: (data: ApiRequest<T>) => Promise<ApiResponse<T>>
): (req: NextApiRequest) => Promise<ApiResponse<T>> {
  return req => {
    let data: ApiRequest<T>

    try {
      data = validator(req.body)
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, error.message)
    }

    return handler(data)
  }
}
