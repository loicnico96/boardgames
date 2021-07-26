import { ApiError } from "lib/api/error"
import { HttpHeader, HttpMethod, HttpStatus } from "lib/api/types"
import { getCurrentUser } from "lib/firebase/auth"
import { generate } from "lib/utils/arrays"
import { enumValues } from "lib/utils/enums"

import { ApiLogger } from "../logger"

export async function getHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    [HttpHeader.CONTENT_TYPE]: "application/json",
  }

  const firebaseUser = getCurrentUser()

  if (firebaseUser) {
    const authToken = await firebaseUser.getIdToken()
    headers[HttpHeader.AUTHORIZATION] = `Bearer ${authToken}`
  }

  return headers
}

export const HttpClient = generate(enumValues(HttpMethod), method => [
  method.toLowerCase() as Lowercase<HttpMethod>,
  async (api: string, body?: unknown): Promise<unknown> => {
    const logger = new ApiLogger(method, api)

    const fetchOptions: RequestInit = {
      headers: await getHeaders(),
      method,
    }

    if (body) {
      logger.log("Calling with:", body)
      fetchOptions.body = JSON.stringify(body)
    } else {
      logger.log("Calling without body")
    }

    const response = await fetch(api, fetchOptions)

    if (response.status !== HttpStatus.OK) {
      const message = await response.text()
      throw new ApiError(response.status, message)
    }

    const data = await response.json()

    logger.log("Response:", data)

    return data
  },
])
