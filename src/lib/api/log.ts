import { NextApiRequest } from "next"

export function getLogKey(req: NextApiRequest): string {
  return `[${req.method} ${req.url}]`
}

export function log(
  req: NextApiRequest,
  message: string,
  ...params: unknown[]
): void {
  const logKey = getLogKey(req)
  console.log(`${logKey} ${message}`, ...params)
}

export function logError(req: NextApiRequest, error: Error): void {
  const logKey = getLogKey(req)
  console.error(`${logKey} Error:`, error)
}
