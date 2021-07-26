import { NextApiRequest } from "next"

import { ApiError } from "lib/api/error"
import { ApiLogger } from "lib/api/logger"
import { HttpStatus } from "lib/api/types"
import { AuthUserInfo } from "lib/auth/types"
import { auth } from "lib/firebase/admin"

const AUTH_PREFIX = "Bearer "

export async function getUserId(
  req: NextApiRequest,
  logger: ApiLogger
): Promise<string> {
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

  try {
    const { uid: userId } = await auth.verifyIdToken(authToken)
    logger.log(`Authenticated as ${userId}`)
    return userId
  } catch (error) {
    logger.error(error)
    throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
  }
}

export async function getUserInfo(userId: string): Promise<AuthUserInfo> {
  const { displayName, email, photoURL } = await auth.getUser(userId)
  return {
    email: email ?? null,
    imageUrl: photoURL ?? null,
    userName: displayName ?? null,
  }
}
