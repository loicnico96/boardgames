import { getTime, getTimeDiff, toError } from "@boardgames/utils"
import { NextApiRequest, NextApiResponse } from "next"

import { getParam } from "hooks/useParam"
import { ApiError } from "lib/api/error"
import { ApiLogger } from "lib/api/logger"
import { HttpHeader, HttpMethod, HttpStatus } from "lib/api/types"
import { Param } from "lib/utils/navigation"

import { ApiHandler } from "./types"

export function handle<
  T extends Partial<Record<HttpMethod, Record<string, unknown>>>
>(handlers: {
  [K in keyof T]: ApiHandler<T[K]>
}): (request: NextApiRequest, response: NextApiResponse) => Promise<void> {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const timeStart = getTime()

    if (!request.method || !request.url) {
      response.status(HttpStatus.BAD_REQUEST).send("Invalid")
      return
    }

    const handler = handlers[request.method as HttpMethod]

    if (!handler) {
      response.setHeader(HttpHeader.ALLOW, Object.keys(handlers))
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send("Method not allowed")
      return
    }

    const logger = new ApiLogger(request.method as HttpMethod, request.url)

    try {
      if (request.body) {
        logger.log("Calling with:", request.body)
      } else {
        logger.log("Calling without body")
      }

      const data = await handler(Object.assign(request, { logger }))

      if (data === undefined) {
        logger.log("No content")
        response.status(HttpStatus.NO_CONTENT).end()
      } else {
        logger.log("Response:", data)
        response.status(HttpStatus.OK).json(data)
      }
    } catch (error) {
      logger.error(toError(error))
      if (error instanceof ApiError) {
        response.status(error.statusCode).send(error.message)
      } else {
        response.status(HttpStatus.INTERNAL_ERROR).send("Internal")
      }
    } finally {
      const timeDiff = getTimeDiff(timeStart)
      logger.log(`Responded in ${timeDiff}ms`)
    }
  }
}

export function readBody<T>(request: NextApiRequest): T {
  // @TODO - Validate body
  return request.body as T
}

export function readParam(request: NextApiRequest, param: Param): string {
  const value = getParam(request.query, param)

  if (!value) {
    throw new ApiError(HttpStatus.BAD_REQUEST, `Missing parameter '${param}'`)
  }

  return value
}
