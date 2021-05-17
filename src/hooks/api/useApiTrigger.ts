import { useCallback } from "react"

import { ApiError } from "lib/api/error"
import {
  ApiRequest,
  ApiResponse,
  ApiTrigger,
  HttpHeader,
  HttpMethod,
  HttpStatus,
} from "lib/api/types"

export function useApiTrigger<T extends ApiTrigger>(
  api: T
): (params: ApiRequest<T>) => Promise<ApiResponse<T>> {
  return useCallback(
    async (params: ApiRequest<T>) => {
      const logName = `[${HttpMethod.POST} ${api}]`

      if (process.env.NODE_ENV === "development") {
        console.log(`${logName} Calling...`)
      }

      const response = await fetch(api, {
        method: HttpMethod.POST,
        headers: {
          [HttpHeader.CONTENT_TYPE]: "application/json",
        },
        body: JSON.stringify(params),
      })

      if (response.status !== HttpStatus.OK) {
        const message = await response.text()
        throw new ApiError(response.status, message)
      }

      const data = await response.json()

      if (process.env.NODE_ENV === "development") {
        console.log(`${logName} Response:`, data)
      }

      return data
    },
    [api]
  )
}
