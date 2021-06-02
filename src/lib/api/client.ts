import { ApiError } from "lib/api/error"
import { ApiRequest, ApiResponse, ApiTrigger } from "lib/api/triggers"
import { HttpHeader, HttpMethod, HttpStatus } from "lib/api/types"
import { getCurrentUser } from "lib/firebase/auth"
import { Debug } from "lib/utils/debug"

export async function getHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {}

  headers[HttpHeader.CONTENT_TYPE] = "application/json"

  const firebaseUser = getCurrentUser()

  if (firebaseUser) {
    const authToken = await firebaseUser.getIdToken()
    headers[HttpHeader.AUTHORIZATION] = `Bearer ${authToken}`
  }

  return headers
}

export async function trigger<T extends ApiTrigger>(
  api: T,
  params: ApiRequest<T>
): Promise<ApiResponse<T>> {
  Debug.log(`[${HttpMethod.POST} ${api}] Calling...`)

  const response = await fetch(api, {
    body: JSON.stringify(params),
    headers: await getHeaders(),
    method: HttpMethod.POST,
  })

  if (response.status !== HttpStatus.OK) {
    const message = await response.text()
    throw new ApiError(response.status, message)
  }

  const data = await response.json()

  Debug.log(`[${HttpMethod.POST} ${api}] Response:`, data)

  return data
}
