import { NextApiRequest, NextApiResponse } from "next"

import { getTime, getTimeDiff } from "lib/utils/performance"

import { ApiError } from "./error"
import { ApiLogger } from "./logger"
import { HttpMethod, HttpStatus } from "./types"

export type ApiHandler<T = unknown> = (
  req: NextApiRequest,
  logger: ApiLogger
) => Promise<T>

export function handle(
  handlers: Partial<Record<HttpMethod, ApiHandler>>
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const timeStart = getTime()
    const logger = new ApiLogger(req)

    const handler = handlers[req.method as HttpMethod]
    if (!handler) {
      res.setHeader("Allow", Object.keys(handlers))
      res.status(HttpStatus.METHOD_NOT_ALLOWED).send("Method not allowed")
      return
    }

    try {
      if (req.body) {
        logger.log("Calling with:", req.body)
      } else {
        logger.log("Calling without body")
      }

      const data = await handler(req, logger)

      if (data !== null) {
        logger.log("Response:", data)
        res.status(HttpStatus.OK).json(data)
      } else {
        logger.log("No content")
        res.status(HttpStatus.NO_CONTENT).end()
      }
    } catch (error) {
      logger.error(error)
      if (error instanceof ApiError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(HttpStatus.INTERNAL).send("Internal")
      }
    } finally {
      const timeDiff = getTimeDiff(timeStart)
      logger.log(`Responded in ${timeDiff}ms`)
    }
  }
}
