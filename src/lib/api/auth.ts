import { NextApiRequest } from "next"

import { auth } from "lib/firebase/admin"

import { ApiError } from "./error"
import { ApiLogger } from "./logger"
import { ApiHandler, HttpStatus } from "./types"

export type ApiHandlerWithAuth<T> = (
  req: NextApiRequest,
  userId: string
) => Promise<T>

const AUTH_PREFIX = "Bearer "

export function authenticate<T>(handler: ApiHandlerWithAuth<T>): ApiHandler<T> {
  return async req => {
    const logger = new ApiLogger(req)

    const authHeader = req.headers.authorization

    if (!authHeader) {
      logger.error(Error("Missing Authorization header"))
      throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
    }

    if (!authHeader.startsWith(AUTH_PREFIX)) {
      logger.error(Error(`Invalid Authorization header - ${authHeader}`))
      throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
    }

    const authToken = authHeader.slice(AUTH_PREFIX.length)

    let userId: string

    try {
      userId = await auth.verifyIdToken(authToken).then(decoded => decoded.uid)
      logger.log(`Authenticated as ${userId}`)
    } catch (error) {
      logger.error(error)
      throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
    }

    return handler(req, userId)
  }
}
