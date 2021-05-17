import { NextApiRequest, NextApiResponse } from "next"

import { getTime, getTimeDiff } from "lib/utils/performance"

import { ApiError } from "./error"
import { log, logError } from "./log"
import { ApiHandler, HttpMethod, HttpStatus } from "./types"

export function handle(
  handlers: Partial<Record<HttpMethod, ApiHandler>>
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const handler = handlers[req.method as HttpMethod]
    if (!handler) {
      res.setHeader("Allow", Object.keys(handlers))
      res.status(HttpStatus.METHOD_NOT_ALLOWED).send("Method not allowed")
      return
    }

    const timeStart = getTime()

    try {
      if (req.body) {
        log(req, "Calling with:", req.body)
      } else {
        log(req, "Calling without body")
      }

      const data = await handler(req)

      if (data) {
        log(req, "Response:", data)
        res.status(HttpStatus.OK).json(data)
      } else {
        log(req, "No content")
        res.status(HttpStatus.NO_CONTENT).end()
      }
    } catch (error) {
      logError(req, error)
      if (error instanceof ApiError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(HttpStatus.INTERNAL).send("Internal")
      }
    } finally {
      const timeDiff = getTimeDiff(timeStart)
      log(req, `Responded in ${timeDiff}ms`)
    }
  }
}
