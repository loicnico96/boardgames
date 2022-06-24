import { ApiError } from "next/dist/server/api-utils"

import { ApiLogger } from "lib/api/logger"
import {
  AUTH_TOKEN_PREFIX,
  ContentType,
  HttpHeader,
  HttpMethod,
  HttpStatus,
} from "lib/api/types"
import { FirebaseAuth } from "lib/firebase/auth"
import { route } from "lib/utils/navigation"

const API_PATH = "api"

export async function getHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    [HttpHeader.CONTENT_TYPE]: ContentType.JSON,
  }

  const authToken = await FirebaseAuth.getCurrentUserIdToken()

  if (authToken) {
    headers[HttpHeader.AUTHORIZATION] = AUTH_TOKEN_PREFIX + authToken
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
    throw new ApiError(response.status, await response.text())
  }

  const data = await response.json()

  logger.log("Response:", data)

  return data as T
}

export function apiPath(...segments: string[]): string {
  return route(API_PATH, ...segments)
}
