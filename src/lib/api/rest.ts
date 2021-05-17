import { NextApiRequest, NextApiResponse } from "next"

import { getTime, getTimeDiff } from "lib/utils/performance"

import { ApiError } from "./error"
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

    const logName = `[${req.method} ${req.url}]`
    const timeStart = getTime()

    try {
      console.log(`${logName} Calling with:`, req.body)
      const json = await handler(req)
      console.log(`${logName} Response:`, json)
      res.status(HttpStatus.OK).json(json)
    } catch (error) {
      console.error(`${logName} Error:`, error)
      if (error instanceof ApiError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(HttpStatus.INTERNAL).send("Internal")
      }
    } finally {
      const timeDiff = getTimeDiff(timeStart)
      console.log(`${logName} Responded in ${timeDiff}ms`)
    }
  }
}
