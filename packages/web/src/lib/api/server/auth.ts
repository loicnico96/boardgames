import { toError } from "@boardgames/utils"

import { ApiError } from "lib/api/error"
import { AUTH_TOKEN_PREFIX, HttpStatus } from "lib/api/types"
import { AuthUserInfo } from "lib/auth/types"
import { auth } from "lib/firebase/admin"

import { ApiRequest } from "./types"

export async function getUserId(request: ApiRequest): Promise<string> {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw Error("Missing Authorization header")
    }

    if (!authHeader.startsWith(AUTH_TOKEN_PREFIX)) {
      throw Error("Invalid Authorization header")
    }

    const encodedToken = authHeader.slice(AUTH_TOKEN_PREFIX.length)
    const decodedToken = await auth.verifyIdToken(encodedToken)
    const userId = decodedToken.uid

    request.logger.log(`Authenticated as ${userId}`)

    return userId
  } catch (error) {
    request.logger.error(toError(error))
    throw new ApiError(HttpStatus.NOT_AUTHENTICATED, "Not authenticated")
  }
}

export async function getUserInfo(userId: string): Promise<AuthUserInfo> {
  const user = await auth.getUser(userId)
  return {
    email: user.email ?? null,
    imageUrl: user.photoURL ?? null,
    userName: user.displayName ?? null,
  }
}
