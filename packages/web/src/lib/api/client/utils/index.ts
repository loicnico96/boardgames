import { ApiError } from "lib/api/error"
import { ApiLogger } from "lib/api/logger"
import { HttpHeader, HttpMethod, HttpStatus } from "lib/api/types"
import { getCurrentUser } from "lib/firebase/auth"

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

export async function apiCall<T>(
  method: HttpMethod,
  api: string,
  body?: Record<string, unknown>
): Promise<T> {
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

  return data as T
}

export function apiPath(...segments: string[]): string {
  return `/api/${segments.join("/")}`
}
