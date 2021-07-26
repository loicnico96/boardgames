import { NextApiRequest, NextApiResponse } from "next"

import { getParam } from "hooks/useParam"
import { ApiError } from "lib/api/error"
import { ApiLogger, LogLevel } from "lib/api/logger"
import { HttpHeader, HttpMethod, HttpStatus } from "lib/api/types"
import { isEnum } from "lib/utils/enums"
import { Param } from "lib/utils/navigation"
import { getTime, getTimeDiff } from "lib/utils/performance"
import { Validator } from "lib/utils/validation"

export type ApiHandler<T = unknown> = (
  request: NextApiRequest,
  logger: ApiLogger
) => Promise<T>

export function handle(
  handlers: Partial<Record<HttpMethod, ApiHandler>>
): (request: NextApiRequest, response: NextApiResponse) => Promise<void> {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const timeStart = getTime()

    if (!isEnum(request.method, HttpMethod)) {
      response.setHeader(HttpHeader.ALLOW, Object.keys(handlers))
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send("Method not allowed")
      return
    }

    if (!request.url) {
      response.status(HttpStatus.INTERNAL).send("Internal")
      return
    }

    const logger = new ApiLogger(request.method, request.url, LogLevel.DEBUG)

    const handler = handlers[request.method]

    if (!handler) {
      response.setHeader(HttpHeader.ALLOW, Object.keys(handlers))
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send("Method not allowed")
      return
    }

    try {
      if (request.body) {
        logger.log("Calling with:", request.body)
      } else {
        logger.log("Calling without body")
      }

      const data = await handler(request, logger)

      if (data !== null) {
        logger.log("Response:", data)
        response.status(HttpStatus.OK).json(data)
      } else {
        logger.log("No content")
        response.status(HttpStatus.NO_CONTENT).end()
      }
    } catch (error) {
      logger.error(error)
      if (error instanceof ApiError) {
        response.status(error.statusCode).send(error.message)
      } else {
        response.status(HttpStatus.INTERNAL).send("Internal")
      }
    } finally {
      const timeDiff = getTimeDiff(timeStart)
      logger.log(`Responded in ${timeDiff}ms`)
    }
  }
}

export function readBody<T>(
  request: NextApiRequest,
  validator: Validator<T>
): T {
  try {
    return validator(request.body)
  } catch (error) {
    throw new ApiError(HttpStatus.BAD_REQUEST, error.message)
  }
}

export function readParam(request: NextApiRequest, param: Param): string {
  const value = getParam(request.query, param)

  if (!value) {
    throw new ApiError(HttpStatus.BAD_REQUEST, `Missing parameter '${param}'`)
  }

  return value
}
