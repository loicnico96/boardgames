import { NextApiRequest } from "next"

import { Validator } from "lib/utils/validation"

import { ApiError } from "./error"
import { ApiRequest, ApiResponse, ApiTrigger, HttpStatus } from "./types"

export function validate<T extends ApiTrigger>(
  validator: Validator<ApiRequest<T>>,
  handler: (data: ApiRequest<T>, userId: string) => Promise<ApiResponse<T>>
): (req: NextApiRequest, userId: string) => Promise<ApiResponse<T>> {
  return (req: NextApiRequest, userId: string) => {
    let data: ApiRequest<T>

    try {
      data = validator(req.body)
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, error.message)
    }

    return handler(data, userId)
  }
}
