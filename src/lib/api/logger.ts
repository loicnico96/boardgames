import { NextApiRequest } from "next"

export class ApiLogger {
  prefix: string

  constructor(req: NextApiRequest) {
    this.prefix = `[${req.method} ${req.url}]`
  }

  log(message: string, ...params: unknown[]): void {
    console.log(`${this.prefix} ${message}`, ...params)
  }

  warn(message: string, ...params: unknown[]): void {
    console.warn(`${this.prefix} ${message}`, ...params)
  }

  error(error: Error): void {
    console.error(this.prefix, error)
  }
}
