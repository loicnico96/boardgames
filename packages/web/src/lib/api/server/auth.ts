import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"
import { AuthUserInfo } from "lib/auth/types"
import { auth } from "lib/firebase/admin"
import { toError } from "lib/utils/error"

import { ApiRequest } from "./types"

const AUTH_PREFIX = "Bearer "

export async function getUserId(request: ApiRequest): Promise<string> {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw Error("Missing Authorization header")
    }

    if (!authHeader.startsWith(AUTH_PREFIX)) {
      throw Error("Invalid Authorization header")
    }

    const authToken = authHeader.slice(AUTH_PREFIX.length)
    const { uid: userId } = await auth.verifyIdToken(authToken)

    request.logger.log(`Authenticated as ${userId}`)

    return userId
  } catch (error) {
    request.logger.error(toError(error))
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
