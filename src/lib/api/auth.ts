import { auth } from "lib/firebase/admin"

import { ApiError } from "./error"
import { log, logError } from "./log"
import { ApiHandler, HttpStatus } from "./types"

export type ApiHandlerWithAuth<T> = (
  ...args: [...Parameters<ApiHandler<T>>, string]
) => ReturnType<ApiHandler<T>>

export function authenticate<T>(handler: ApiHandlerWithAuth<T>): ApiHandler<T> {
  return async req => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      console.error(Error("Missing Authorization header"))
      throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.error(Error(`Invalid Authorization header - ${authHeader}`))
      throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
    }

    const authToken = authHeader.slice("Bearer ".length)

    try {
      const decodedToken = await auth.verifyIdToken(authToken)
      const userId = decodedToken.uid
      log(req, `Authenticated as ${userId}`)
      return await handler(req, userId)
    } catch (error) {
      logError(req, error)
      throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
    }
  }
}
