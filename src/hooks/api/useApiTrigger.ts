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
import auth from "lib/firebase/auth"

export function useApiTrigger<T extends ApiTrigger>(
  api: T
): (params: ApiRequest<T>) => Promise<ApiResponse<T>> {
  return useCallback(
    async (params: ApiRequest<T>) => {
      const logName = `[${HttpMethod.POST} ${api}]`

      if (process.env.NODE_ENV === "development") {
        console.log(`${logName} Calling...`)
      }

      const headers: HeadersInit = {}

      // Send body as JSON
      headers[HttpHeader.CONTENT_TYPE] = "application/json"
      const body = JSON.stringify(params)

      if (auth.currentUser) {
        // Set "Authorization" header if user is logged in
        const authToken = await auth.currentUser.getIdToken()
        headers[HttpHeader.AUTHORIZATION] = `Bearer ${authToken}`
      }

      const response = await fetch(api, {
        method: HttpMethod.POST,
        headers,
        body,
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
