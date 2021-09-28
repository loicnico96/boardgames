import { NextApiRequest } from "next"

import { ApiLogger } from "lib/api/logger"

export type ApiRequest = NextApiRequest & {
  logger: ApiLogger
}

export type ApiHandler<T> = (request: ApiRequest) => Promise<T>
